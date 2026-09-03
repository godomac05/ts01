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

export async function sendImageMessage(
  to: string,
  link: string,
  caption?: string,
): Promise<void> {
  await callGraphApi({
    messaging_product: "whatsapp",
    to,
    type: "image",
    image: { link, caption },
  });
}

export async function markMessageAsRead(messageId: string): Promise<void> {
  await callGraphApi({
    messaging_product: "whatsapp",
    status: "read",
    message_id: messageId,
  });
}

/**
 * Descarga un archivo multimedia (ej. una imagen) que un usuario envió por
 * WhatsApp. Es un proceso de dos pasos: primero se pide la URL temporal del
 * archivo a partir de su media ID, y luego se descarga esa URL — ambos pasos
 * requieren el token de acceso de la app.
 */
export async function downloadMedia(
  mediaId: string,
): Promise<{ base64: string; mimeType: string }> {
  const infoResponse = await fetch(
    `https://graph.facebook.com/${config.whatsappApiVersion}/${mediaId}`,
    { headers: { Authorization: `Bearer ${config.whatsappToken}` } },
  );

  if (!infoResponse.ok) {
    throw new Error(
      `No se pudo obtener la URL del archivo (${infoResponse.status}): ${await infoResponse.text()}`,
    );
  }

  const info = (await infoResponse.json()) as { url?: string; mime_type?: string };
  if (!info.url) {
    throw new Error("La respuesta de la API de medios de WhatsApp no incluyó una URL.");
  }

  const fileResponse = await fetch(info.url, {
    headers: { Authorization: `Bearer ${config.whatsappToken}` },
  });

  if (!fileResponse.ok) {
    throw new Error(`No se pudo descargar el archivo (${fileResponse.status}).`);
  }

  const buffer = Buffer.from(await fileResponse.arrayBuffer());
  return {
    base64: buffer.toString("base64"),
    mimeType: info.mime_type ?? "image/jpeg",
  };
}
