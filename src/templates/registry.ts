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
];
