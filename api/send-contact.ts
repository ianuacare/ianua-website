import type { VercelRequest, VercelResponse } from "@vercel/node";

const EMAILJS_API = "https://api.emailjs.com/api/v1.0/email/send";
const EMAIL_MAX = 254;

type ContactFormPayload = {
  email: string;
  name?: string;
  message?: string;
  source?: string;
};

function isAllowedHost(hostname: string): boolean {
  if (hostname === "localhost" || hostname === "127.0.0.1") return true;
  if (hostname.endsWith(".vercel.app")) return true;
  if (hostname === "ianuacare.it" || hostname === "www.ianuacare.it") return true;
  if (hostname.endsWith(".ianuacare.it")) return true;
  if (hostname === "ianua.it" || hostname === "www.ianua.it") return true;
  if (hostname.endsWith(".ianua.it")) return true;
  return false;
}

function isAllowedOrigin(req: VercelRequest): boolean {
  const origin = req.headers.origin?.trim();
  if (origin) {
    try {
      if (isAllowedHost(new URL(origin).hostname)) return true;
    } catch {
      /* ignore */
    }
  }

  const referer = req.headers.referer?.trim();
  if (!referer) return false;

  try {
    return isAllowedHost(new URL(referer).hostname);
  } catch {
    return false;
  }
}

function readEmailJsConfig():
  | { publicKey: string; serviceId: string; templateId: string; privateKey?: string }
  | null {
  const publicKey = (
    process.env.EMAILJS_PUBLIC_KEY ?? process.env.VITE_EMAILJS_PUBLIC_KEY
  )?.trim();
  const serviceId = (
    process.env.EMAILJS_SERVICE_ID ?? process.env.VITE_EMAILJS_SERVICE_ID
  )?.trim();
  const templateId = (
    process.env.EMAILJS_TEMPLATE_ID ?? process.env.VITE_EMAILJS_TEMPLATE_ID
  )?.trim();
  const privateKey = process.env.EMAILJS_PRIVATE_KEY?.trim();

  if (!publicKey || !serviceId || !templateId) return null;
  return { publicKey, serviceId, templateId, privateKey };
}

function isValidContactEmail(email: string): boolean {
  if (email.length > EMAIL_MAX) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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

function buildTemplateParams(payload: ContactFormPayload):
  | Record<string, string>
  | { error: string } {
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
    time: new Date().toLocaleString("it-IT", {
      dateStyle: "medium",
      timeStyle: "short",
    }),
    source,
  };
}

function parseBody(req: VercelRequest): ContactFormPayload | null {
  const raw = req.body;
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;

  const email = typeof raw.email === "string" ? raw.email : "";
  if (!email) return null;

  return {
    email,
    name: typeof raw.name === "string" ? raw.name : undefined,
    message: typeof raw.message === "string" ? raw.message : undefined,
    source: typeof raw.source === "string" ? raw.source : undefined,
  };
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
): Promise<void> {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Metodo non consentito" });
    return;
  }

  if (!isAllowedOrigin(req)) {
    res.status(403).json({ error: "Origine non consentita." });
    return;
  }

  const config = readEmailJsConfig();
  if (!config) {
    res.status(503).json({
      error:
        "EmailJS non configurato: imposta EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID e EMAILJS_TEMPLATE_ID su Vercel.",
    });
    return;
  }

  const payload = parseBody(req);
  if (!payload) {
    res.status(400).json({ error: "Richiesta non valida." });
    return;
  }

  const templateParams = buildTemplateParams(payload);
  if ("error" in templateParams) {
    res.status(400).json({ error: templateParams.error });
    return;
  }

  try {
    const body: Record<string, unknown> = {
      lib_version: "4.4.1",
      user_id: config.publicKey,
      service_id: config.serviceId,
      template_id: config.templateId,
      template_params: templateParams,
    };
    if (config.privateKey) {
      body.accessToken = config.privateKey;
    }

    const response = await fetch(EMAILJS_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const text = await response.text();
    if (!response.ok) {
      console.error("EmailJS API error:", response.status, text);
      res.status(502).json({ error: "Impossibile inviare la richiesta." });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (e: unknown) {
    console.error("api/send-contact:", e);
    res.status(500).json({ error: "Errore interno durante l'invio." });
  }
}
