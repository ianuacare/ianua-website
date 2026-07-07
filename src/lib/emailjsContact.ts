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

function contactTitle(source: string): string {
  switch (source) {
    case "home":
      return "Home — richiesta contatto";
    case "ianua-mind":
      return "Ianua Mind — richiesta contatto";
    default:
      return "Richiesta contatto dal sito";
  }
}

function contactTimestamp(): string {
  return new Date().toLocaleString("it-IT", {
    dateStyle: "medium",
    timeStyle: "short",
  });
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

  const name = payload.name?.trim() || "Visitatore del sito";
  const message = payload.message?.trim() || "—";
  const source = payload.source?.trim() || "sito";

  const result = await emailjs.send(
    serviceId,
    templateId,
    {
      email,
      name,
      message,
      title: contactTitle(source),
      time: contactTimestamp(),
      source,
    },
    { publicKey },
  );

  if (result.status !== 200) {
    throw new Error("Impossibile inviare la richiesta.");
  }
}
