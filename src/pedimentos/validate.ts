export interface PedimentoFields {
  anio: string;
  aduana: string;
  patente: string;
  folio: string;
}

export interface PedimentoValidationResult {
  valid: boolean;
  normalized: string;
  fields?: PedimentoFields;
  errors: string[];
}

/**
 * Valida solo la ESTRUCTURA de un número de pedimento (15 dígitos: año(2) +
 * aduana(2) + patente(4) + folio(7)). No confirma que el pedimento exista
 * realmente ante el SAT — eso requeriría consultar un servicio externo, que
 * esta función deliberadamente no hace.
 */
export function validatePedimentoFormat(raw: string): PedimentoValidationResult {
  const digitsOnly = raw.replace(/\D/g, "");
  const errors: string[] = [];

  if (digitsOnly.length !== 15) {
    errors.push(
      `Debe tener exactamente 15 dígitos (año + aduana + patente + folio); este tiene ${digitsOnly.length}.`,
    );
    return { valid: false, normalized: digitsOnly, errors };
  }

  const anio = digitsOnly.slice(0, 2);
  const aduana = digitsOnly.slice(2, 4);
  const patente = digitsOnly.slice(4, 8);
  const folio = digitsOnly.slice(8, 15);

  const currentYear2Digits = Number(String(new Date().getFullYear()).slice(2));
  if (Number(anio) > currentYear2Digits + 1) {
    errors.push(`El año "20${anio}" es posterior al año actual; revisa que esté bien capturado.`);
  }

  if (aduana === "00") {
    errors.push('La clave de aduana "00" no es válida.');
  }

  if (patente === "0000") {
    errors.push('La patente "0000" no es válida.');
  }

  if (folio === "0000000") {
    errors.push('El folio "0000000" no es válido.');
  }

  return {
    valid: errors.length === 0,
    normalized: digitsOnly,
    fields: { anio, aduana, patente, folio },
    errors,
  };
}
