const EMAIL_MAX = 254;

export type ContactFormPayload = {
  email: string;
  name?: string;
  message?: string;
  source?: string;
};

export type ContactTemplateParams = {
  email: string;
  name: string;
  message: string;
  title: string;
  time: string;
  source: string;
};

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

export function isValidContactEmail(email: string): boolean {
  if (email.length > EMAIL_MAX) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function buildContactTemplateParams(
  payload: ContactFormPayload,
): ContactTemplateParams | { error: string } {
  const email = payload.email.trim();
  if (!email || !isValidContactEmail(email)) {
    return { error: "Indirizzo email non valido." };
  }

  const source = payload.source?.trim() || "sito";

  return {
    email,
    name: payload.name?.trim() || "Visitatore del sito",
    message: payload.message?.trim() || "—",
    title: contactTitle(source),
    time: contactTimestamp(),
    source,
  };
}
