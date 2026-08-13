import fs from "fs";
import path from "path";
import type { KnowledgeChunk } from "../types";

const KNOWLEDGE_DIR = path.join(__dirname, "..", "..", "knowledge");

/**
 * Divide un archivo markdown en fragmentos usando los encabezados "## " como
 * separadores. Cada fragmento conserva su encabezado como contexto para el
 * modelo y para la búsqueda por palabras clave.
 */
function chunkMarkdown(source: string, raw: string): KnowledgeChunk[] {
  const lines = raw.split("\n");
  const chunks: KnowledgeChunk[] = [];

  let currentHeading = "Introducción";
  let buffer: string[] = [];

  const flush = () => {
    const content = buffer.join("\n").trim();
    if (content) {
      chunks.push({ source, heading: currentHeading, content });
    }
    buffer = [];
  };

  for (const line of lines) {
    const headingMatch = /^##\s+(.*)/.exec(line);
    if (headingMatch) {
      flush();
      currentHeading = headingMatch[1].trim();
      continue;
    }
    // Saltar el título principal (# ...) para no duplicarlo en cada chunk.
    if (/^#\s+/.test(line)) continue;
    buffer.push(line);
  }
  flush();

  return chunks;
}

export function loadKnowledgeBase(): KnowledgeChunk[] {
  if (!fs.existsSync(KNOWLEDGE_DIR)) return [];

  const files = fs
    .readdirSync(KNOWLEDGE_DIR)
    .filter((f) => f.endsWith(".md"))
    .sort();

  const allChunks: KnowledgeChunk[] = [];
  for (const file of files) {
    const fullPath = path.join(KNOWLEDGE_DIR, file);
    const raw = fs.readFileSync(fullPath, "utf-8");
    allChunks.push(...chunkMarkdown(file, raw));
  }
  return allChunks;
}
