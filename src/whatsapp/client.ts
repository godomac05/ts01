import { config } from "../config";

const BASE_URL = `https://graph.facebook.com/${config.whatsappApiVersion}/${config.whatsappPhoneNumberId}/messages`;

async function callGraphApi(body: Record<string, unknown>): Promise<void> {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.whatsappToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Error al llamar a la API de WhatsApp (${response.status}): ${errorBody}`,
    );
  }
}

export async function sendTextMessage(to: string, text: string): Promise<void> {
  await callGraphApi({
    messaging_product: "whatsapp",
    to,
    type: "text",
    text: { body: text, preview_url: false },
  });
}

export async function sendDocumentMessage(
  to: string,
  link: string,
  filename: string,
  caption?: string,
): Promise<void> {
  await callGraphApi({
    messaging_product: "whatsapp",
    to,
    type: "document",
    document: { link, filename, caption },
  });
}

export async function markMessageAsRead(messageId: string): Promise<void> {
  await callGraphApi({
    messaging_product: "whatsapp",
    status: "read",
    message_id: messageId,
  });
}
