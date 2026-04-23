import type { Handler } from "@netlify/functions";
import { generateText } from "ai";

const MAX_PROMPT_LENGTH = 12_000;

const SYSTEM = `Sei un copywriter del magazine digitale di Ianua (healthcare, psicologia, innovazione clinica, IA etica al servizio di chi cura e di chi fa ricerca).
A partire dal brief che ricevi, scrivi un articolo per il magazine: tono autorevole ma caldo, italiano corretto, struttura editoriale chiara.
Includi: titolo (H1), sottotitolo o incipit, 2–4 sezioni con sottotitoli, chiusura con spunto o call-to-action leggera. Se servono dati specifici che non hai, dichiaralo con prudenza e suggerisci dove verificarli — non inventare statistiche o nomi propri non presenti nel brief.
Output in Markdown.`;

function json(statusCode: number, body: Record<string, unknown>) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  };
}

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return json(405, { error: "Metodo non consentito" });
  }

  const apiKey = process.env.AI_GATEWAY_API_KEY;
  if (!apiKey?.trim()) {
    return json(503, {
      error:
        "AI Gateway non configurato: imposta AI_GATEWAY_API_KEY tra le variabili d’ambiente (Netlify / file .env con netlify dev).",
    });
  }

  let parsed: { prompt?: unknown };
  try {
    parsed = JSON.parse(event.body || "{}") as { prompt?: unknown };
  } catch {
    return json(400, { error: "JSON non valido nel corpo della richiesta." });
  }

  const prompt =
    typeof parsed.prompt === "string" ? parsed.prompt.trim() : "";
  if (!prompt) {
    return json(400, { error: "Campo prompt obbligatorio (stringa non vuota)." });
  }
  if (prompt.length > MAX_PROMPT_LENGTH) {
    return json(400, {
      error: `Prompt troppo lungo (massimo ${MAX_PROMPT_LENGTH} caratteri).`,
    });
  }

  const model =
    process.env.AI_GATEWAY_MODEL?.trim() || "openai/gpt-4o-mini";

  try {
    const result = await generateText({
      model,
      system: SYSTEM,
      prompt,
      maxOutputTokens: 4096,
      temperature: 0.65,
    });

    return json(200, {
      article: result.text,
      usage: result.usage,
      finishReason: result.finishReason,
    });
  } catch (e: unknown) {
    const message =
      e instanceof Error ? e.message : "Errore durante la generazione.";
    console.error("generate-article:", e);
    return json(502, { error: message });
  }
};
