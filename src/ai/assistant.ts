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
- Usa emojis con presencia, al estilo de mensajes de soporte reales: ✅ para confirmaciones o pasos resueltos, ⚠️ para avisos o precauciones, 📄 cuando menciones un documento/plantilla, 🚛 para temas de transporte/unidades, ❌ para errores. Úsalos para dar estructura visual al mensaje, no de forma decorativa o excesiva.
- Usa el CONTEXTO proporcionado abajo como fuente principal. Si el contexto no cubre la pregunta, puedes usar tu conocimiento general sobre CFDI y Carta Porte, pero acláralo brevemente.
- Nunca inventes cifras, plazos, artículos legales o números de trámite que no estén en el contexto o que no sepas con certeza.
- Las reglas fiscales del SAT cambian con frecuencia (Resolución Miscelánea Fiscal, Anexo 20). Si hay riesgo de que la información esté desactualizada, dilo explícitamente y sugiere verificar en el portal del SAT o con un contador.
- Si la pregunta es específica de la cuenta o datos del usuario (por ejemplo, un error puntual en su timbrado) y no puedes resolverla con la información disponible, recomienda que se ponga en contacto con el **Grupo de soporte de Tractosoft**. Usa ese nombre exacto, tal cual — nunca inventes abreviaturas ni otros nombres para el soporte. No des una dirección de correo o teléfono específico salvo que el usuario ya lo haya mencionado en la conversación.
- No proporciones asesoría legal o fiscal definitiva; aclara que es orientación general.

CONTEXTO RELEVANTE (extraído de la base de conocimiento):
${contextChunks || "(No se encontró contexto específico para esta pregunta; responde con tu conocimiento general y las aclaraciones correspondientes.)"}`;
}

export async function generateReply(
  userMessage: string,
  history: ConversationTurn[],
  knowledgeIndex: KnowledgeIndex,
): Promise<string> {
  const relevantChunks = knowledgeIndex.search(userMessage, 5);
  const contextText = relevantChunks
    .map((c) => `### ${c.heading} (fuente: ${c.source})\n${c.content}`)
    .join("\n\n");

  const messages: Anthropic.MessageParam[] = [
    ...history.map((turn) => ({
      role: turn.role,
      content: turn.content,
    })),
    { role: "user", content: userMessage },
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
