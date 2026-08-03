import express from "express";
import { config } from "./config";
import { loadKnowledgeBase } from "./knowledge/loader";
import { KnowledgeIndex } from "./knowledge/search";
import { generateReply } from "./ai/assistant";
import { markMessageAsRead, sendTextMessage } from "./whatsapp/client";
import { parseIncomingTextMessages, verifyWebhookChallenge } from "./whatsapp/webhook";
import { appendTurns, getHistory } from "./session/store";

const app = express();
app.use(express.json());

const knowledgeIndex = new KnowledgeIndex(loadKnowledgeBase());
console.log(`Base de conocimiento cargada.`);

// Evita procesar el mismo mensaje dos veces si Meta reintenta la entrega del webhook.
const processedMessageIds = new Set<string>();
const MAX_PROCESSED_IDS = 1000;

app.get("/webhook", (req, res) => {
  const challenge = verifyWebhookChallenge(
    req.query["hub.mode"] as string | undefined,
    req.query["hub.verify_token"] as string | undefined,
    req.query["hub.challenge"] as string | undefined,
    config.whatsappVerifyToken,
  );

  if (challenge) {
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

app.post("/webhook", (req, res) => {
  // Responder de inmediato: Meta espera un 200 rápido y reintenta si tarda.
  res.sendStatus(200);

  const messages = parseIncomingTextMessages(req.body);

  for (const message of messages) {
    if (processedMessageIds.has(message.id)) continue;
    processedMessageIds.add(message.id);
    if (processedMessageIds.size > MAX_PROCESSED_IDS) {
      const oldest = processedMessageIds.values().next().value;
      if (oldest) processedMessageIds.delete(oldest);
    }

    handleIncomingMessage(message.from, message.id, message.text).catch(
      (error) => {
        console.error(`Error procesando mensaje de ${message.from}:`, error);
      },
    );
  }
});

async function handleIncomingMessage(
  from: string,
  messageId: string,
  text: string,
): Promise<void> {
  await markMessageAsRead(messageId).catch((error) =>
    console.error("No se pudo marcar el mensaje como leído:", error),
  );

  const history = getHistory(from);
  const reply = await generateReply(text, history, knowledgeIndex);

  await sendTextMessage(from, reply);

  appendTurns(from, [
    { role: "user", content: text },
    { role: "assistant", content: reply },
  ]);
}

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(config.port, () => {
  console.log(`Servidor del bot escuchando en el puerto ${config.port}`);
});
