/** Origine pubblica senza slash finale — da `VITE_SITE_URL` (build Vercel / CI). */
export function getSiteOrigin(): string {
  const raw = import.meta.env.VITE_SITE_URL as string | undefined;
  const trimmed = raw?.trim().replace(/\/+$/, "");
  return trimmed || "https://www.ianua.it";
}

/** URL assoluta per una path applicativa (`/` o `/coming-soon`). */
export function absoluteUrl(pathname: string): string {
  const origin = getSiteOrigin();
  if (!pathname || pathname === "/") {
    return `${origin}/`;
  }
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${origin}${path}`;
}
