import { config } from "../config";

const WHISPER_URL = "https://api.openai.com/v1/audio/transcriptions";

/**
 * Transcribe un audio a texto usando la API de Whisper de OpenAI. Claude no
 * acepta audio directamente, así que este es un paso previo obligatorio
 * para poder procesar notas de voz igual que un mensaje de texto normal.
 */
export async function transcribeAudio(
  base64: string,
  mimeType: string,
): Promise<string> {
  if (!config.openaiApiKey) {
    throw new Error("Falta configurar OPENAI_API_KEY para transcribir audio.");
  }

  const buffer = Buffer.from(base64, "base64");
  const extension = mimeType.includes("ogg") ? "ogg" : (mimeType.split("/")[1] ?? "ogg");

  const formData = new FormData();
  formData.append("file", new Blob([buffer], { type: mimeType }), `audio.${extension}`);
  formData.append("model", "whisper-1");
  formData.append("language", "es");

  const response = await fetch(WHISPER_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${config.openaiApiKey}` },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(
      `Error al transcribir audio (${response.status}): ${await response.text()}`,
    );
  }

  const data = (await response.json()) as { text?: string };
  return (data.text ?? "").trim();
}
