import { TEMPLATES, TemplateDefinition } from "./registry";

const REQUEST_WORDS = ["plantilla", "plantillas", "layout", "formato", "formatos"];

function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

export type TemplateDetection =
  | { type: "template"; template: TemplateDefinition }
  | { type: "list" };

/**
 * Detecta si el usuario está pidiendo una plantilla descargable. Requiere una
 * palabra de solicitud ("plantilla", "layout", etc.) para evitar disparar con
 * preguntas normales que mencionan "cliente" o "ruta" sin pedir un archivo.
 */
export function detectTemplateRequest(rawText: string): TemplateDetection | null {
  const text = normalize(rawText);
  const mentionsRequestWord = REQUEST_WORDS.some((word) => text.includes(word));
  if (!mentionsRequestWord) return null;

  const matches = TEMPLATES.filter((tpl) =>
    tpl.keywords.some((keyword) => text.includes(keyword)),
  );

  if (matches.length === 1) {
    return { type: "template", template: matches[0] };
  }

  // Sin coincidencia específica (o con varias a la vez): mandamos el catálogo completo.
  return { type: "list" };
}
