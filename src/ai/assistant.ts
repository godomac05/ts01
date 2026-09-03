import Anthropic from "@anthropic-ai/sdk";
import { config } from "../config";
import { KnowledgeIndex } from "../knowledge/search";
import type { ConversationTurn } from "../types";

const client = new Anthropic({ apiKey: config.anthropicApiKey });

function buildSystemPrompt(contextChunks: string): string {
  return `Eres el asistente de soporte por WhatsApp de "${config.platformName}", una plataforma para timbrado de CFDI y Complemento Carta Porte en México.

Tu trabajo es resolver dudas de los usuarios sobre:
- El proceso de timbrado de CFDI 4.0.
- Reglas y estructura del Complemento Carta Porte (transporte de carga: autotransporte, marítimo, aéreo, ferroviario).
- El Complemento de Pago (REP / CFDI tipo P).
- Cómo usar la plataforma (generar, cancelar, descargar o corregir un CFDI/Carta Porte).
- Errores comunes de validación del SAT relacionados con estos documentos.

Reglas de respuesta:
- Responde siempre en español, con un tono profesional, claro y directo, apto para WhatsApp (mensajes cortos, sin bloques enormes de texto).
- Formato de texto: WhatsApp usa un solo asterisco para negritas, así: *texto en negrita*. NUNCA uses doble asterisco (**texto**) — no se interpreta como negrita en WhatsApp y se ve como texto roto con asteriscos literales.
- Listas y pasos numerados: usa números normales seguidos de punto, así: "1. Primer paso", "2. Segundo paso". NUNCA uses emojis de números (1️⃣2️⃣3️⃣ etc.) para numerar listas.
- Usa emojis con mucha presencia, al estilo de mensajes de soporte reales — este es un punto importante, no lo minimices. Elige uno relevante para CADA punto de una lista o paso, no solo para uno o dos: por ejemplo 🧾 comprobante/CFDI, 🆔 emisor/receptor/RFC, 📍 ubicaciones/domicilios, 📦 mercancías, 🚛 autotransporte/unidades, ✈️ aéreo, 🚢 marítimo, 🚆 ferroviario, 👤 operador/figura de transporte, ✅ confirmaciones o pasos resueltos/revisar y timbrar, ⚠️ avisos o precauciones, 📄 documentos/plantillas, 📌 notas importantes, ❌ errores. Si ninguno de estos aplica exactamente, elige el emoji que mejor represente la idea del punto — el objetivo es que casi cada línea de una lista tenga uno. La única restricción es dónde NO van: nunca como numeración (nada de 1️⃣2️⃣3️⃣) ni como viñetas reemplazando el punto de una lista.
- El nombre de la plataforma es exactamente "${config.platformName}". Usa ese nombre completo tal cual — nunca inventes abreviaturas ni siglas para referirte a la plataforma (por ejemplo, nunca digas "TS WB" ni ninguna otra sigla inventada).
- Usa el CONTEXTO proporcionado abajo como fuente principal. Si el contexto no cubre la pregunta, puedes usar tu conocimiento general sobre CFDI y Carta Porte, pero acláralo brevemente.
- Nunca inventes cifras, plazos, artículos legales o números de trámite que no estén en el contexto o que no sepas con certeza.
- Las reglas fiscales del SAT cambian con frecuencia (Resolución Miscelánea Fiscal, Anexo 20). Si hay riesgo de que la información esté desactualizada, dilo explícitamente y sugiere verificar en el portal del SAT o con un contador.
- Si la pregunta es específica de la cuenta o datos del usuario (por ejemplo, un error puntual en su timbrado) y no puedes resolverla con la información disponible, recomienda que se ponga en contacto con el *Grupo de soporte de Tractosoft*. Usa ese nombre exacto, tal cual — nunca inventes abreviaturas ni otros nombres para el soporte. No des una dirección de correo o teléfono específico salvo que el usuario ya lo haya mencionado en la conversación.
- No proporciones asesoría legal o fiscal definitiva; aclara que es orientación general.
- Los usuarios a veces mandan una imagen (una captura de pantalla de un error de la plataforma, un documento, una placa, una etiqueta). Cuando recibas una imagen, descríbela brevemente para confirmar que la viste bien y responde con base en lo que muestra, cruzándolo con el CONTEXTO de abajo (por ejemplo, si es un mensaje de error de timbrado, o una pantalla del sistema). Si la imagen no es legible o no tiene relación con CFDI/Carta Porte/la plataforma, dilo con claridad en vez de adivinar.

CONTEXTO RELEVANTE (extraído de la base de conocimiento):
${contextChunks || "(No se encontró contexto específico para esta pregunta; responde con tu conocimiento general y las aclaraciones correspondientes.)"}`;
}

export interface ImageInput {
  base64: string;
  mimeType: string;
}

const SUPPORTED_IMAGE_MEDIA_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
] as const;
type SupportedImageMediaType = (typeof SUPPORTED_IMAGE_MEDIA_TYPES)[number];

function toSupportedMediaType(mimeType: string): SupportedImageMediaType {
  return (SUPPORTED_IMAGE_MEDIA_TYPES as readonly string[]).includes(mimeType)
    ? (mimeType as SupportedImageMediaType)
    : "image/jpeg";
}

export async function generateReply(
  userMessage: string,
  history: ConversationTurn[],
  knowledgeIndex: KnowledgeIndex,
  image?: ImageInput,
): Promise<string> {
  // Para la búsqueda en el knowledge base usamos el texto del usuario; si
  // solo mandó una imagen sin texto, usamos una consulta genérica.
  const searchQuery = userMessage || "imagen enviada por el usuario";
  const relevantChunks = knowledgeIndex.search(searchQuery, 5);
  const contextText = relevantChunks
    .map((c) => `### ${c.heading} (fuente: ${c.source})\n${c.content}`)
    .join("\n\n");

  const currentTurnContent: Anthropic.MessageParam["content"] = image
    ? [
        {
          type: "image",
          source: {
            type: "base64",
            media_type: toSupportedMediaType(image.mimeType),
            data: image.base64,
          },
        },
        { type: "text", text: userMessage || "(El usuario no escribió texto junto con la imagen.)" },
      ]
    : userMessage;

  const messages: Anthropic.MessageParam[] = [
    ...history.map((turn) => ({
      role: turn.role,
      content: turn.content,
    })),
    { role: "user", content: currentTurnContent },
  ];

  const response = await client.messages.create({
    model: config.claudeModel,
    max_tokens: 1024,
    system: buildSystemPrompt(contextText),
    thinking: { type: "adaptive" },
    output_config: { effort: "medium" },
    messages,
  });

  const textBlock = response.content.find(
    (block): block is Anthropic.TextBlock => block.type === "text",
  );

  return (
    textBlock?.text.trim() ??
    "Lo siento, no pude generar una respuesta en este momento. Intenta de nuevo en unos segundos."
  );
}
