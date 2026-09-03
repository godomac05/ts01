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
 * Extrae mensajes de texto e imagen entrantes; ignora eventos de estado
 * (entregado/leído) y otros tipos de mensaje (audio, documento, etc.) que
 * este bot no maneja todavía.
 */
export function parseIncomingMessages(body: unknown): IncomingWhatsAppMessage[] {
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
          image?: { id?: string; mime_type?: string; caption?: string };
        };

        if (!msg.from || !msg.id) continue;

        if (msg.type === "text" && msg.text?.body) {
          messages.push({
            from: msg.from,
            id: msg.id,
            timestamp: msg.timestamp ?? String(Date.now()),
            type: "text",
            text: msg.text.body,
          });
          continue;
        }

        if (msg.type === "image" && msg.image?.id && msg.image?.mime_type) {
          messages.push({
            from: msg.from,
            id: msg.id,
            timestamp: msg.timestamp ?? String(Date.now()),
            type: "image",
            image: {
              mediaId: msg.image.id,
              mimeType: msg.image.mime_type,
              caption: msg.image.caption,
            },
          });
        }
      }
    }
  }

  return messages;
}
