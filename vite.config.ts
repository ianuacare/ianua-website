import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/**
 * Default base `/` → corretto per Netlify e dominio alla root.
 * Per GitHub Pages (progetto in sottopath): `vite build --base /ianua-website/`
 * oppure variabile `BASE_URL` gestita dal CLI Vite.
 */
export default defineConfig({
  plugins: [react()],
  base: "/",
});
