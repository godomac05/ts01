const PEDIMENTO_KEYWORDS = ["pedimento", "pedimentos"];

export interface PedimentoDetection {
  rawNumber: string;
}

/**
 * Detecta si el usuario está pidiendo validar un número de pedimento:
 * menciona la palabra "pedimento" y trae una secuencia de dígitos que, al
 * quitarle espacios/guiones, tiene exactamente 15 dígitos.
 */
export function detectPedimentoQuery(text: string): PedimentoDetection | null {
  const lower = text.toLowerCase();
  const mentionsPedimento = PEDIMENTO_KEYWORDS.some((k) => lower.includes(k));
  if (!mentionsPedimento) return null;

  const candidates = text.match(/\d[\d\s-]{10,24}\d/g) ?? [];
  for (const candidate of candidates) {
    const digitsOnly = candidate.replace(/\D/g, "");
    if (digitsOnly.length === 15) {
      return { rawNumber: candidate.trim() };
    }
  }
  return null;
}
