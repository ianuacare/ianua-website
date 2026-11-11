/**
 * Tracciamento delle campagne: chi arriva da un link con parametri UTM
 * porta quei parametri fino alla registrazione su mind.ianuacare.it.
 *
 * I parametri restano nella sessione del browser: se la persona naviga
 * nella landing prima di cliccare «Prova gratis», non si perdono.
 * Nei link mettiamo solo codici di campagna, mai dati personali.
 */

export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

const STORAGE_KEY = "ianua_utm";
const APP_HOST = "mind.ianuacare.it";
const MAX_LENGTH = 100;

type Utm = Partial<Record<(typeof UTM_KEYS)[number], string>>;

/** Legge gli UTM dall'URL; se ce ne sono, sostituiscono quelli salvati. */
export function captureUtm(search: string = window.location.search): void {
  const params = new URLSearchParams(search);
  const found: Utm = {};
  for (const key of UTM_KEYS) {
    const value = params.get(key)?.trim();
    if (value) found[key] = value.slice(0, MAX_LENGTH);
  }
  if (Object.keys(found).length === 0) return;
  cached = found;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(found));
  } catch {
    // Navigazione privata o storage bloccato: il tracciamento è facoltativo.
  }
}

/** Solo stringhe note: un valore salvato male (null, numero, altro) non deve rompere la pagina. */
function sanitize(value: unknown): Utm {
  if (!value || typeof value !== "object") return {};
  const out: Utm = {};
  for (const key of UTM_KEYS) {
    const v = (value as Record<string, unknown>)[key];
    if (typeof v === "string" && v) out[key] = v.slice(0, MAX_LENGTH);
  }
  return out;
}

let cached: Utm | null = null;

function storedUtm(): Utm {
  if (cached) return cached;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    cached = raw ? sanitize(JSON.parse(raw)) : {};
  } catch {
    cached = {};
  }
  return cached;
}

/** Aggiunge gli UTM salvati ai link verso l'app; gli altri link restano come sono. */
export function trackedHref(href: string): string {
  let url: URL;
  try {
    url = new URL(href);
  } catch {
    return href;
  }
  if (url.hostname !== APP_HOST) return href;
  const utm = storedUtm();
  for (const key of UTM_KEYS) {
    const value = utm[key];
    if (value && !url.searchParams.has(key)) url.searchParams.set(key, value);
  }
  return url.toString();
}
