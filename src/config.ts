import "dotenv/config";

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Falta la variable de entorno requerida: ${name}`);
  }
  return value;
}

export const config = {
  port: Number(process.env.PORT ?? 3000),

  anthropicApiKey: required("ANTHROPIC_API_KEY"),
  claudeModel: process.env.CLAUDE_MODEL ?? "claude-opus-5",

  whatsappToken: required("WHATSAPP_TOKEN"),
  whatsappPhoneNumberId: required("WHATSAPP_PHONE_NUMBER_ID"),
  whatsappVerifyToken: required("WHATSAPP_VERIFY_TOKEN"),
  whatsappApiVersion: process.env.WHATSAPP_API_VERSION ?? "v21.0",

  platformName: process.env.PLATFORM_NAME ?? "nuestra plataforma",

  // URL pública donde corre este servidor (ngrok en pruebas, tu dominio en
  // producción). Necesaria para poder enviar plantillas descargables por
  // WhatsApp; si no está configurada, esa función avisa al usuario en vez de
  // fallar en silencio.
  publicBaseUrl: process.env.PUBLIC_BASE_URL?.replace(/\/+$/, ""),
};
