import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  generateMagazineDraft,
  isAiGatewayConfigured,
  parseGenerateBody,
} from "../lib/magazine-article";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
): Promise<void> {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Metodo non consentito" });
    return;
  }

  if (!isAiGatewayConfigured()) {
    res.status(503).json({
      error:
        "AI Gateway non configurato: imposta AI_GATEWAY_API_KEY nelle variabili d’ambiente del progetto Vercel (o in .env con `vercel dev`).",
    });
    return;
  }

  const raw =
    typeof req.body === "string"
      ? req.body
      : JSON.stringify(req.body ?? {});
  const parsed = parseGenerateBody(raw);
  if (!parsed.ok) {
    res.status(parsed.status).json({ error: parsed.error });
    return;
  }

  try {
    const out = await generateMagazineDraft(parsed.prompt);
    res.status(200).json(out);
  } catch (e: unknown) {
    const message =
      e instanceof Error ? e.message : "Errore durante la generazione.";
    console.error("api/generate-article:", e);
    res.status(502).json({ error: message });
  }
}
