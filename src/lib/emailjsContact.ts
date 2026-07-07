import emailjs from "@emailjs/browser";

const EMAIL_MAX = 254;

export type ContactFormPayload = {
  email: string;
  name?: string;
  message?: string;
  source?: string;
};

function isValidEmail(email: string): boolean {
  if (email.length > EMAIL_MAX) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isEmailJsConfigured(): boolean {
  return Boolean(
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim() &&
      import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim() &&
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim(),
  );
}

export async function sendContactEmail(payload: ContactFormPayload): Promise<void> {
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim();
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim();
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim();

  if (!publicKey || !serviceId || !templateId) {
    throw new Error("EmailJS non configurato.");
  }

  const email = payload.email.trim();
  if (!email || !isValidEmail(email)) {
    throw new Error("Indirizzo email non valido.");
  }

  const result = await emailjs.send(
    serviceId,
    templateId,
    {
      from_email: email,
      from_name: payload.name?.trim() || "—",
      message: payload.message?.trim() || "—",
      source: payload.source?.trim() || "sito",
    },
    { publicKey },
  );

  if (result.status !== 200) {
    throw new Error("Impossibile inviare la richiesta.");
  }
}
