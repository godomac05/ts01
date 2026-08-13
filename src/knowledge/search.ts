import type { KnowledgeChunk } from "../types";

const SPANISH_STOPWORDS = new Set([
  "de",
  "la",
  "que",
  "el",
  "en",
  "y",
  "a",
  "los",
  "del",
  "se",
  "las",
  "por",
  "un",
  "para",
  "con",
  "no",
  "una",
  "su",
  "al",
  "lo",
  "como",
  "mas",
  "o",
  "pero",
  "sus",
  "le",
  "ya",
  "o",
  "este",
  "esta",
  "entre",
  "cuando",
  "muy",
  "sin",
  "sobre",
  "tambien",
  "me",
  "hasta",
  "hay",
  "donde",
  "quien",
  "desde",
  "todo",
  "nos",
  "durante",
  "es",
  "son",
  "ser",
  "mi",
  "tu",
  "si",
  "yo",
]);

function stripAccents(text: string): string {
  return text.normalize("NFD").replace(/[̀-ͯ]/g, "");
}

function tokenize(text: string): string[] {
  return stripAccents(text.toLowerCase())
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length > 2 && !SPANISH_STOPWORDS.has(token));
}

type TermVector = Map<string, number>;

interface IndexedChunk {
  chunk: KnowledgeChunk;
  vector: TermVector;
  norm: number;
}

export class KnowledgeIndex {
  private idf = new Map<string, number>();
  private indexed: IndexedChunk[] = [];

  constructor(chunks: KnowledgeChunk[]) {
    this.build(chunks);
  }

  private build(chunks: KnowledgeChunk[]): void {
    const docTokens = chunks.map((chunk) =>
      tokenize(`${chunk.heading} ${chunk.content}`),
    );

    const docFrequency = new Map<string, number>();
    for (const tokens of docTokens) {
      for (const term of new Set(tokens)) {
        docFrequency.set(term, (docFrequency.get(term) ?? 0) + 1);
      }
    }

    const totalDocs = chunks.length || 1;
    for (const [term, freq] of docFrequency) {
      this.idf.set(term, Math.log(1 + totalDocs / freq));
    }

    this.indexed = chunks.map((chunk, i) => {
      const tokens = docTokens[i];
      const termFreq = new Map<string, number>();
      for (const term of tokens) {
        termFreq.set(term, (termFreq.get(term) ?? 0) + 1);
      }

      const vector: TermVector = new Map();
      for (const [term, tf] of termFreq) {
        const weight = tf * (this.idf.get(term) ?? 0);
        vector.set(term, weight);
      }

      const norm = Math.sqrt(
        [...vector.values()].reduce((sum, w) => sum + w * w, 0),
      );

      return { chunk, vector, norm };
    });
  }

  search(query: string, topK = 5): KnowledgeChunk[] {
    const queryTokens = tokenize(query);
    if (queryTokens.length === 0 || this.indexed.length === 0) return [];

    const queryTermFreq = new Map<string, number>();
    for (const term of queryTokens) {
      queryTermFreq.set(term, (queryTermFreq.get(term) ?? 0) + 1);
    }

    const queryVector: TermVector = new Map();
    for (const [term, tf] of queryTermFreq) {
      queryVector.set(term, tf * (this.idf.get(term) ?? 0));
    }
    const queryNorm = Math.sqrt(
      [...queryVector.values()].reduce((sum, w) => sum + w * w, 0),
    );
    if (queryNorm === 0) return [];

    const scored = this.indexed.map((entry) => {
      let dot = 0;
      for (const [term, weight] of queryVector) {
        const docWeight = entry.vector.get(term);
        if (docWeight) dot += weight * docWeight;
      }
      const score = entry.norm > 0 ? dot / (entry.norm * queryNorm) : 0;
      return { chunk: entry.chunk, score };
    });

    return scored
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, topK)
      .map((s) => s.chunk);
  }
}
