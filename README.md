# Bot de WhatsApp — Soporte de Timbrado Carta Porte

Bot de WhatsApp construido desde cero para responder dudas sobre el proceso de
timbrado de CFDI 4.0, el Complemento Carta Porte, el Complemento de Pago (REP)
y el uso de tu plataforma.

## Arquitectura

```
WhatsApp (usuario)
      │
      ▼
Meta WhatsApp Cloud API  ──webhook──▶  src/server.ts (Express)
                                          │
                                          ├─ src/whatsapp/        (enviar/recibir mensajes)
                                          ├─ src/session/store.ts (historial por número)
                                          ├─ src/knowledge/       (carga + búsqueda de la base de conocimiento)
                                          ├─ src/templates/       (detecta y envía plantillas descargables)
                                          └─ src/ai/assistant.ts  (llama a Claude con el contexto relevante)
```

- **WhatsApp**: Meta WhatsApp Cloud API (oficial, gratis hasta cierto volumen).
- **Backend**: Node.js + TypeScript + Express.
- **IA**: API de Claude (Anthropic), modelo configurable (por defecto
  `claude-opus-5`).
- **Base de conocimiento**: archivos Markdown en `knowledge/`, indexados con
  una búsqueda TF-IDF ligera (sin dependencias externas ni base de datos
  vectorial) para inyectar solo el contexto relevante en cada respuesta.
- **Historial de conversación**: en memoria + respaldo simple en
  `data/conversations.json`, por número de teléfono.
- **Plantillas descargables**: archivos en `plantillas/` (Excel/CSV) que los
  usuarios pueden pedir por WhatsApp (ej. "plantilla de rutas") y reciben
  directo como documento adjunto. Ver `plantillas/README.md`.

## Requisitos

- Node.js 18 o superior.
- Una API key de Anthropic (https://console.anthropic.com/).
- Una cuenta de Meta for Developers con una app de WhatsApp Business
  configurada (Meta WhatsApp Cloud API).

## Configuración

1. Instala dependencias:

   ```bash
   npm install
   ```

2. Copia `.env.example` a `.env` y llena los valores:

   ```bash
   cp .env.example .env
   ```

   - `ANTHROPIC_API_KEY`: tu API key de Anthropic.
   - `CLAUDE_MODEL`: modelo a usar (por defecto `claude-opus-5`; puedes usar
     `claude-sonnet-5` para reducir costo en volumen alto).
   - `WHATSAPP_TOKEN`: token de acceso de tu app de Meta (ver abajo).
   - `WHATSAPP_PHONE_NUMBER_ID`: el "Phone Number ID" de tu número de
     WhatsApp Business (no es el número telefónico).
   - `WHATSAPP_VERIFY_TOKEN`: un token que tú inventas, para la verificación
     del webhook (debe coincidir con el que configures en Meta).
   - `PLATFORM_NAME` / `SUPPORT_CONTACT`: se usan en el prompt del bot.

3. Agrega o reemplaza el contenido en `knowledge/` con la documentación real
   de tu plataforma (ver `knowledge/README.md`).
4. Si vas a usar las plantillas descargables (`plantillas/`), configura
   `PUBLIC_BASE_URL` con la URL pública de tu servidor (ver
   `plantillas/README.md` para más detalle).

## Configurar la app de WhatsApp en Meta for Developers

1. Crea una app en https://developers.facebook.com/apps con el producto
   "WhatsApp" agregado.
2. En la sección WhatsApp > API Setup obtén:
   - Un **token de acceso temporal** (para pruebas) o genera uno
     **permanente** vinculando un System User (para producción).
   - El **Phone Number ID** del número de prueba o de tu número verificado.
3. En WhatsApp > Configuration, configura el **Webhook**:
   - **Callback URL**: `https://<tu-dominio-publico>/webhook`
   - **Verify Token**: el mismo valor que pusiste en `WHATSAPP_VERIFY_TOKEN`.
   - Suscríbete al campo **messages**.
4. Agrega el/los números de teléfono de prueba en la lista de destinatarios
   permitidos (mientras la app esté en modo de desarrollo).

Para pruebas locales, expón tu servidor con un túnel (ejemplo con ngrok):

```bash
npx ngrok http 3000
```

Usa la URL HTTPS que te da ngrok como Callback URL en el paso 3.

## Ejecutar en desarrollo

```bash
npm run dev
```

Esto levanta el servidor en `http://localhost:3000` con recarga automática.
Verifica que esté vivo con:

```bash
curl http://localhost:3000/health
```

## Compilar y ejecutar en producción

```bash
npm run build
npm start
```

Despliega en cualquier servicio que soporte Node.js (Railway, Render, Fly.io,
un VPS con PM2, etc.) y configura las mismas variables de entorno de `.env`.

## Cómo funciona el flujo de un mensaje

1. Meta envía un `POST /webhook` con el mensaje del usuario.
2. El servidor responde `200 OK` de inmediato (requerido por Meta) y procesa
   el mensaje de forma asíncrona.
3. Se marca el mensaje como leído.
4. Se recupera el historial reciente de esa conversación (`src/session/store.ts`).
5. Se buscan los fragmentos más relevantes de `knowledge/` para la pregunta
   (`src/knowledge/search.ts`).
6. Se llama a la API de Claude con el system prompt, el contexto relevante y
   el historial (`src/ai/assistant.ts`).
7. Se envía la respuesta por WhatsApp y se guarda el turno en el historial.

## Extender el bot

- **Agregar más conocimiento**: agrega archivos `.md` en `knowledge/` — no
  requiere cambios de código. Ver `knowledge/README.md`.
- **Cambiar el tono o alcance del bot**: edita el system prompt en
  `src/ai/assistant.ts` (`buildSystemPrompt`).
- **Agregar comandos especiales** (por ejemplo, "reiniciar conversación"):
  intercepta el texto entrante en `src/server.ts` antes de llamar a
  `generateReply`.
- **Persistencia más robusta**: si el volumen crece, reemplaza
  `src/session/store.ts` por una base de datos (Redis/Postgres) manteniendo
  la misma interfaz (`getHistory`, `appendTurns`, `clearHistory`).

## Limitaciones conocidas

- La base de conocimiento inicial sobre CFDI 4.0 y Carta Porte es
  **información general**, no una consulta en tiempo real al SAT. Las reglas
  fiscales cambian con frecuencia — revisa `knowledge/README.md` para más
  detalles y actualiza los documentos conforme cambien las reglas.
- El bot no tiene acceso a los datos de cuenta del usuario en tu plataforma
  (no está conectado a tu base de datos ni a tu backend). Si necesitas que
  responda con datos específicos de la cuenta del usuario (estado de un
  timbrado, saldo, etc.), habría que agregar una integración adicional con
  la API de tu plataforma.
