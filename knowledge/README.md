# Base de conocimiento del bot

Esta carpeta contiene los documentos que el bot usa para responder preguntas. El
bot los carga al iniciar (`src/knowledge/loader.ts`), los divide en fragmentos
por cada encabezado `## ...` y hace una búsqueda por relevancia (`src/knowledge/search.ts`)
para inyectar solo los fragmentos más útiles en cada respuesta.

## Cómo agregar o actualizar contenido

1. Agrega un archivo `.md` nuevo (o edita uno existente) en esta carpeta.
2. Usa `# Título del documento` una sola vez al inicio.
3. Divide el contenido en secciones con `## Subtítulo` — cada una se indexa como
   un fragmento independiente, así que trata de que cada sección cubra un tema
   específico y autocontenido (una pregunta frecuente, una regla, un proceso).
4. Reinicia el bot (`npm run dev` o redeploy) para que cargue los cambios; no
   requiere ningún paso adicional, no hay base de datos que migrar.

## Archivos actuales

- `00-plataforma-faq.md`: **placeholder** — aquí debes agregar las preguntas
  frecuentes específicas de tu plataforma (cómo generar un timbrado, errores de
  tu sistema, planes, límites, contacto de soporte, etc.). Reemplaza los
  ejemplos con tu contenido real.
- `10-cfdi-40-timbrado.md`: proceso general de CFDI 4.0 y timbrado.
- `20-carta-porte-general.md`: qué es el Complemento Carta Porte, quién debe
  usarlo y su estructura general.
- `21-carta-porte-autotransporte.md`: reglas específicas de autotransporte
  federal de carga.
- `22-carta-porte-otros-medios.md`: transporte marítimo, aéreo y ferroviario.
- `23-carta-porte-errores-comunes.md`: errores de validación frecuentes.
- `30-complemento-pago-rep.md`: Complemento de Pago / REP (CFDI tipo P).
- `50-catalogos-cfdi-generales.md`: catálogos generales del SAT para CFDI 4.0
  (tipo de comprobante, uso CFDI, régimen fiscal, forma/método de pago,
  moneda, tipo de relación, exportación, objeto de impuesto, impuestos).
- `51-catalogos-carta-porte.md`: catálogos específicos de Carta Porte (tipo
  de permiso SCT, configuración vehicular, subtipo de remolque, embalaje,
  unidades y claves de producto/servicio más usadas en transporte de carga).

## Nota importante sobre vigencia

El contenido de estos archivos (excepto `00-plataforma-faq.md`) refleja el
marco general del CFDI 4.0 y el Complemento Carta Porte vigente a inicios de
2026, basado en conocimiento general y no en una consulta en tiempo real al
portal del SAT. Las reglas de la Resolución Miscelánea Fiscal (RMF) y el Anexo
20 cambian con frecuencia. Se recomienda:

- Verificar cambios recientes en el portal del SAT o con tu proveedor de
  certificación (PAC) antes de tomar decisiones importantes basadas en estas
  respuestas.
- Reemplazar o complementar estos archivos con las reglas y manuales
  actualizados que tengas disponibles.
