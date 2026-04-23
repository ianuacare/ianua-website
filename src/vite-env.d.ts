/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string;
  /** URL assoluto dell’endpoint contatti se il sito statico è su un dominio diverso dall’API (es. GitHub Pages → Vercel). */
  readonly VITE_CONTACT_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
