import express from "express";
import path from "path";
import { config } from "./config";
import { loadKnowledgeBase } from "./knowledge/loader";
import { KnowledgeIndex } from "./knowledge/search";
import { generateReply } from "./ai/assistant";
import {
  markMessageAsRead,
  sendDocumentMessage,
  sendImageMessage,
  sendTextMessage,
} from "./whatsapp/client";
import { parseIncomingTextMessages, verifyWebhookChallenge } from "./whatsapp/webhook";
import { appendTurns, getHistory } from "./session/store";
import { detectTemplateRequest, TemplateDetection } from "./templates/detector";
import { isImageTemplate, TEMPLATES } from "./templates/registry";

const app = express();
app.use(express.json());
app.use("/plantillas", express.static(path.join(__dirname, "..", "plantillas")));

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

  const templateDetection = detectTemplateRequest(text);
  if (templateDetection) {
    const summary = await sendTemplateResponse(from, templateDetection);
    appendTurns(from, [
      { role: "user", content: text },
      { role: "assistant", content: summary },
    ]);
    return;
  }

  const history = getHistory(from);
  const reply = await generateReply(text, history, knowledgeIndex);

  await sendTextMessage(from, reply);

  appendTurns(from, [
    { role: "user", content: text },
    { role: "assistant", content: reply },
  ]);
}

/** Envía la plantilla solicitada (o el catálogo) y regresa un resumen para el historial. */
async function sendTemplateResponse(
  to: string,
  detection: TemplateDetection,
): Promise<string> {
  if (detection.type === "list") {
    const list = TEMPLATES.map((t) => `• ${t.displayName}`).join("\n");
    const message = `Estas son las plantillas disponibles:\n\n${list}\n\nDime cuál necesitas (ej. "plantilla de rutas") y te la mando.`;
    await sendTextMessage(to, message);
    return "[Se envió la lista de plantillas disponibles]";
  }

  const { template } = detection;

  if (!config.publicBaseUrl) {
    await sendTextMessage(
      to,
      "Por el momento no puedo enviarte archivos (falta configuración del servidor). Contacta a soporte.",
    );
    return `[No se pudo enviar "${template.displayName}": falta PUBLIC_BASE_URL]`;
  }

  const link = `${config.publicBaseUrl}/plantillas/${template.filename}`;
  if (isImageTemplate(template)) {
    await sendImageMessage(to, link, template.description);
  } else {
    await sendDocumentMessage(to, link, template.filename, template.description);
  }
  return `[Se envió el archivo: ${template.displayName}]`;
}

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(config.port, () => {
  console.log(`Servidor del bot escuchando en el puerto ${config.port}`);
});
