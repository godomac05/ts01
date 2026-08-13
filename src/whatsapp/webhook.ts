import type { IncomingWhatsAppMessage } from "../types";

export function verifyWebhookChallenge(
  mode: string | undefined,
  token: string | undefined,
  challenge: string | undefined,
  expectedToken: string,
): string | null {
  if (mode === "subscribe" && token === expectedToken && challenge) {
    return challenge;
  }
  return null;
}

/**
 * Extrae únicamente mensajes de texto entrantes; ignora eventos de estado
 * (entregado/leído) y otros tipos de mensaje (imagen, audio, etc.) que este
 * bot no maneja todavía.
 */
export function parseIncomingTextMessages(
  body: unknown,
): IncomingWhatsAppMessage[] {
  const messages: IncomingWhatsAppMessage[] = [];

  const entries = (body as { entry?: unknown[] })?.entry;
  if (!Array.isArray(entries)) return messages;

  for (const entry of entries) {
    const changes = (entry as { changes?: unknown[] })?.changes;
    if (!Array.isArray(changes)) continue;

    for (const change of changes) {
      const value = (change as { value?: Record<string, unknown> })?.value;
      const rawMessages = value?.messages as unknown[] | undefined;
      if (!Array.isArray(rawMessages)) continue;

      for (const raw of rawMessages) {
        const msg = raw as {
          from?: string;
          id?: string;
          timestamp?: string;
          type?: string;
          text?: { body?: string };
        };

        if (msg.type !== "text" || !msg.text?.body || !msg.from || !msg.id) {
          continue;
        }

        messages.push({
          from: msg.from,
          id: msg.id,
          timestamp: msg.timestamp ?? String(Date.now()),
          text: msg.text.body,
        });
      }
    }
  }

  return messages;
}
