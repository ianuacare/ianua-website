import { generateText } from "ai";

export const MAX_PROMPT_LENGTH = 12_000;

const SYSTEM = `Sei un copywriter del magazine digitale di Ianua (healthcare, psicologia, innovazione clinica, IA etica al servizio di chi cura e di chi fa ricerca).
A partire dal brief che ricevi, scrivi un articolo per il magazine: tono autorevole ma caldo, italiano corretto, struttura editoriale chiara.
Includi: titolo (H1), sottotitolo o incipit, 2–4 sezioni con sottotitoli, chiusura con spunto o call-to-action leggera. Se servono dati specifici che non hai, dichiaralo con prudenza e suggerisci dove verificarli — non inventare statistiche o nomi propri non presenti nel brief.
Output in Markdown.`;

export function isAiGatewayConfigured(): boolean {
  return Boolean(process.env.AI_GATEWAY_API_KEY?.trim());
}

export type ParsedBody =
  | { ok: true; prompt: string }
  | { ok: false; status: number; error: string };

export function parseGenerateBody(
  rawBody: string | null | undefined,
): ParsedBody {
  let parsed: { prompt?: unknown };
  try {
    parsed = JSON.parse(rawBody || "{}") as { prompt?: unknown };
  } catch {
    return { ok: false, status: 400, error: "JSON non valido nel corpo della richiesta." };
  }

  const prompt =
    typeof parsed.prompt === "string" ? parsed.prompt.trim() : "";
  if (!prompt) {
    return {
      ok: false,
      status: 400,
      error: "Campo prompt obbligatorio (stringa non vuota).",
    };
  }
  if (prompt.length > MAX_PROMPT_LENGTH) {
    return {
      ok: false,
      status: 400,
      error: `Prompt troppo lungo (massimo ${MAX_PROMPT_LENGTH} caratteri).`,
    };
  }
  return { ok: true, prompt };
}

export async function generateMagazineDraft(prompt: string) {
  const model =
    process.env.AI_GATEWAY_MODEL?.trim() || "openai/gpt-4o-mini";

  const result = await generateText({
    model,
    system: SYSTEM,
    prompt,
    maxOutputTokens: 4096,
    temperature: 0.65,
  });

  return {
    article: result.text,
    usage: result.usage,
    finishReason: result.finishReason,
  };
}
