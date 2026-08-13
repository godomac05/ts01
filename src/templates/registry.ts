export interface TemplateDefinition {
  key: string;
  filename: string;
  displayName: string;
  description: string;
  /** Palabras normalizadas (minúsculas, sin acentos) que identifican esta plantilla en el mensaje del usuario. */
  keywords: string[];
}

export const TEMPLATES: TemplateDefinition[] = [
  {
    key: "clientes",
    filename: "clientes.xlsx",
    displayName: "Plantilla de Clientes",
    description: "Formato para dar de alta o actualizar clientes de forma masiva.",
    keywords: ["cliente", "clientes"],
  },
  {
    key: "clientes_destino",
    filename: "clientes_destino.csv",
    displayName: "Plantilla de Clientes Destino",
    description:
      "Formato para importar los destinatarios/domicilios de entrega de tus clientes.",
    keywords: [
      "destino",
      "destinos",
      "destinatario",
      "destinatarios",
      "clientedestino",
      "clientesdestino",
    ],
  },
  {
    key: "embalaje",
    filename: "embalaje.csv",
    displayName: "Plantilla de Embalaje",
    description:
      "Formato para registrar mercancías y su embalaje (cantidad, peso, clave de producto).",
    keywords: ["embalaje", "embalajes", "empaque", "mercancia", "mercancias"],
  },
  {
    key: "rutas",
    filename: "rutas.csv",
    displayName: "Plantilla de Rutas",
    description:
      "Catálogo de rutas y distancias entre origen y destino.",
    keywords: ["ruta", "rutas", "distancia", "distancias"],
  },
  {
    key: "unidades",
    filename: "unidades.csv",
    displayName: "Plantilla de Unidades",
    description: "Formato para registrar las unidades/vehículos de tu flota.",
    keywords: [
      "unidad",
      "unidades",
      "vehiculo",
      "vehiculos",
      "camion",
      "camiones",
      "flota",
    ],
  },
  {
    key: "embalaje_viaje_factura",
    filename: "embalaje_viaje_factura.csv",
    displayName: "Plantilla de Embalaje (Viaje y Factura)",
    description:
      "Formato para registrar el embalaje de mercancías asociado a un viaje y su factura.",
    // Sin "embalaje" aquí a propósito: así "plantilla de embalaje" (sin más
    // contexto) apunta solo a la plantilla general de embalaje.
    keywords: ["viaje", "viajes"],
  },
  {
    key: "importacion_masiva",
    filename: "importacion_masiva.csv",
    displayName: "Plantilla de Importación Masiva de Viajes",
    description:
      "Formato para importar viajes/embarques completos de forma masiva (cliente, ruta, unidad, operador, mercancía).",
    keywords: ["masiva", "importacion", "embarque", "embarques"],
  },
  {
    key: "cargas_combustible",
    filename: "cargas_combustible.csv",
    displayName: "Plantilla de Cargas de Combustible",
    description:
      "Formato para importar el historial de cargas de combustible de las unidades.",
    keywords: ["combustible", "diesel", "gasolina"],
  },
  {
    key: "cargos_unidades",
    filename: "cargos_unidades.csv",
    displayName: "Plantilla de Cargos a Unidades",
    description:
      "Formato para registrar cargos/gastos asociados a una unidad (casetas, mantenimiento, etc.).",
    keywords: ["cargo", "cargos", "gasto", "gastos"],
  },
  {
    key: "ccpt",
    filename: "ccpt.csv",
    displayName: "Plantilla CCPT (Complemento Carta Porte)",
    description:
      "Formato con remitente, destinatario y mercancías para el Complemento Carta Porte.",
    // Solo "ccpt" a propósito: evita disparar con preguntas normales sobre
    // "carta porte" en general (el tema principal de este bot).
    keywords: ["ccpt"],
  },
];
