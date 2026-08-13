# Plantillas descargables por WhatsApp

Esta carpeta contiene los archivos (Excel/CSV) que los clientes pueden pedir y
recibir directo por WhatsApp — por ejemplo, si alguien escribe "¿me pasas la
plantilla de rutas?", el bot le manda el archivo `rutas.csv` como documento.

## Cómo funciona

1. El bot detecta cuando alguien pide una "plantilla" / "layout" / "formato"
   de algo (`src/templates/detector.ts`).
2. Busca coincidencia contra las `keywords` definidas en
   `src/templates/registry.ts`.
3. Si encuentra una sola coincidencia, manda el archivo correspondiente de
   esta carpeta como documento de WhatsApp.
4. Si no logra identificar cuál exactamente (o el usuario solo dice
   "plantillas" sin especificar), manda la lista completa para que elija.

## Requisito importante: `PUBLIC_BASE_URL`

Para que WhatsApp pueda descargar el archivo, tu servidor debe ser accesible
públicamente, y esa URL debe estar en `PUBLIC_BASE_URL` dentro de tu `.env`
(tu túnel de ngrok en pruebas, o tu dominio real en producción). Si esta
variable no está configurada, el bot le avisa al usuario que no puede enviar
el archivo en vez de fallar en silencio.

## Cómo agregar una plantilla nueva

1. Coloca el archivo (`.xlsx`, `.csv`, `.pdf`, etc.) en esta carpeta.
2. Agrega una entrada en `src/templates/registry.ts` con:
   - `key`: identificador interno.
   - `filename`: el nombre exacto del archivo en esta carpeta.
   - `displayName`: nombre que ve el usuario.
   - `description`: se usa como "caption" del documento en WhatsApp.
   - `keywords`: palabras (sin acentos, minúsculas) que deben aparecer en el
     mensaje del usuario para identificar esta plantilla.
3. Reinicia el bot.

## Plantillas actuales

- `clientes.xlsx`: alta/actualización masiva de clientes.
- `clientes_destino.csv`: destinatarios/domicilios de entrega de tus clientes.
- `embalaje.csv`: catálogo de mercancías y su embalaje.
- `embalaje_viaje_factura.csv`: embalaje de mercancías asociado a un viaje y
  su factura (formato distinto al de `embalaje.csv`, mismas columnas base).
- `rutas.csv`: catálogo de rutas y distancias.
- `unidades.csv`: catálogo de unidades/vehículos de la flota.
- `importacion_masiva.csv`: importación masiva de viajes/embarques completos
  (cliente, ruta, unidad, operador, mercancía).
- `cargas_combustible.csv`: historial de cargas de combustible por unidad.
- `cargos_unidades.csv`: cargos/gastos asociados a una unidad.
- `ccpt.csv`: remitente, destinatario y mercancías para el Complemento Carta
  Porte.
- `embalaje_cotizaciones.csv`: dimensiones y precio del embalaje usado en
  cotizaciones.
- `facturas_pedimento.csv`: facturas asociadas a un pedimento aduanal.
- `iave.csv`: cargos de casetas/peaje registrados con el tag IAVE.
- `repartos.csv`: remitente y destinatario para repartos/entregas.

## ⚠️ Nota sobre privacidad de datos

Los siguientes archivos se dejaron **intencionalmente** con datos reales (no
solo de ejemplo), por decisión explícita del dueño de la plataforma —
cualquier persona que le escriba al bot pidiendo estas plantillas puede
descargar esa información:

- `clientes.xlsx`: razón social, RFC y domicilio de clientes reales.
- `ccpt.csv`: razón social y RFC de remitente/destinatario reales (Cementos
  Moctezuma, Benol Concretos).
- `cargas_combustible.csv`: nombre completo de una persona real como operador
  de ejemplo.
- `repartos.csv`: una fila con razón social y RFC reales de una empresa
  (Henkel Capital) y, más sensible aún, el **nombre completo y RFC personal**
  de una persona física real.

Si esto cambia de opinión en el futuro, reemplaza esos archivos con una
versión que solo tenga la fila de encabezados (o datos de ejemplo ficticios,
como ya tienen `clientes_destino.csv`, `unidades.csv`, `cargos_unidades.csv`
e `importacion_masiva.csv`).
