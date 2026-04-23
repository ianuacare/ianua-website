import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const EMAIL_MAX = 254;

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function isValidEmail(email: string): boolean {
  if (email.length > EMAIL_MAX) return false;
  // pragmatica: sintassi generale per indirizzi nel form
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function allowedOrigins(): string[] {
  const extra = process.env.CONTACT_ALLOWED_ORIGINS ?? "";
  const defaults = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://ianua-website-five.vercel.app",
    "https://ianuacare.github.io",
    "https://www.ianua.it",
    "https://ianua.it",
  ];
  return [...defaults, ...extra.split(",").map((s) => s.trim()).filter(Boolean)];
}

function resolveCorsOrigin(req: VercelRequest): string | undefined {
  const origin = req.headers.origin;
  if (!origin || typeof origin !== "string") return undefined;
  return allowedOrigins().includes(origin) ? origin : undefined;
}

function applyCors(res: VercelResponse, origin: string | undefined): void {
  if (origin) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Max-Age", "86400");
    res.setHeader("Vary", "Origin");
  }
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
): Promise<void> {
  const corsOrigin = resolveCorsOrigin(req);
  applyCors(res, corsOrigin);

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (!corsOrigin) {
    res.status(403).json({ error: "Origine non consentita." });
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Metodo non consentito" });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to =
    process.env.CONTACT_NOTIFY_EMAIL?.trim() || "info@ianua.it";

  if (!apiKey || !from) {
    res.status(503).json({
      error:
        "Invio email non configurato: imposta RESEND_API_KEY e RESEND_FROM_EMAIL su Vercel.",
    });
    return;
  }

  const raw =
    typeof req.body === "string"
      ? req.body
      : JSON.stringify(req.body ?? "{}");

  let email = "";
  try {
    const parsed = JSON.parse(raw) as { email?: unknown };
    email =
      typeof parsed.email === "string" ? parsed.email.trim() : "";
  } catch {
    res.status(400).json({ error: "Corpo della richiesta non valido." });
    return;
  }

  if (!email || !isValidEmail(email)) {
    res.status(400).json({ error: "Indirizzo email non valido." });
    return;
  }

  const safe = escapeHtml(email);

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: "Richiesta contatto dal sito Ianua",
      html: `
<p>Buongiorno,</p>
<p>Qualcuno ha compilato il modulo contatti sul <strong>sito Ianua</strong> per richiedere informazioni.</p>
<p>Email indicata dal visitatore: <strong>${safe}</strong></p>
<p>Puoi rispondere direttamente a questo messaggio: il destinatario di risposta è impostato sull&apos;indirizzo del visitatore.</p>
<p>&mdash; Notifica automatica dal sito</p>
`.trim(),
    });

    if (error) {
      console.error("resend.emails.send:", error);
      res.status(502).json({ error: "Impossibile inviare la richiesta. Riprova più tardi." });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (e: unknown) {
    console.error("api/send-contact:", e);
    res.status(502).json({ error: "Errore durante l'invio. Riprova più tardi." });
  }
}
