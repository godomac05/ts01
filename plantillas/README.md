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
- `rutas.csv`: catálogo de rutas y distancias.
- `unidades.csv`: catálogo de unidades/vehículos de la flota.

## ⚠️ Nota sobre privacidad de datos

`clientes.xlsx` se dejó **intencionalmente** con datos reales de clientes
(razón social, RFC, domicilio) por decisión explícita del dueño de la
plataforma — cualquier persona que le escriba al bot pidiendo esta plantilla
puede descargar esa información. Si esto cambia de opinión en el futuro,
reemplaza el archivo con uno que solo tenga la fila de encabezados (o datos
de ejemplo ficticios, como ya tienen `clientes_destino.csv` y `unidades.csv`).
