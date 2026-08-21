import fs from "fs";
import path from "path";
import { config } from "../config";
import type { KnowledgeChunk } from "../types";

const KNOWLEDGE_DIR = path.join(__dirname, "..", "..", "knowledge");
const PLATFORM_UI_DIR = path.join(KNOWLEDGE_DIR, "plataforma-ui");

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

function loadMarkdownDir(dir: string, sourcePrefix: string): KnowledgeChunk[] {
  if (!fs.existsSync(dir)) return [];

  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .sort();

  const chunks: KnowledgeChunk[] = [];
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const raw = fs.readFileSync(fullPath, "utf-8");
    chunks.push(...chunkMarkdown(`${sourcePrefix}${file}`, raw));
  }
  return chunks;
}

export function loadKnowledgeBase(): KnowledgeChunk[] {
  // Conocimiento general (CFDI, Carta Porte, catálogos, FAQ): no depende de
  // la versión de la plataforma, siempre se carga completo.
  const generalChunks = loadMarkdownDir(KNOWLEDGE_DIR, "");

  // Conocimiento específico de la interfaz/proceso de la plataforma: solo
  // se carga la carpeta de la versión activa (config.platformUiVersion),
  // para poder tener varias versiones documentadas sin mezclarlas.
  const platformUiDir = path.join(PLATFORM_UI_DIR, config.platformUiVersion);
  const platformUiChunks = loadMarkdownDir(
    platformUiDir,
    `plataforma-ui/${config.platformUiVersion}/`,
  );

  return [...generalChunks, ...platformUiChunks];
}
