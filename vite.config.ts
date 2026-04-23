import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

function writeSeoFiles(siteOrigin: string): Plugin {
  return {
    name: "write-seo-files",
    closeBundle() {
      const rootDir = path.dirname(fileURLToPath(import.meta.url));
      const distDir = path.resolve(rootDir, "dist");
      if (!fs.existsSync(distDir)) return;

      const robots = `User-agent: *
Allow: /

Sitemap: ${siteOrigin}/sitemap.xml
`;

      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteOrigin}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1</priority>
  </url>
  <url>
    <loc>${siteOrigin}/coming-soon</loc>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>
`;

      fs.writeFileSync(path.join(distDir, "robots.txt"), robots);
      fs.writeFileSync(path.join(distDir, "sitemap.xml"), sitemap);
    },
  };
}

/**
 * Default base `/` → corretto per Vercel e dominio alla root.
 * Per GitHub Pages (progetto in sottopath): `vite build --base /ianua-website/`
 * oppure variabile `BASE_URL` gestita dal CLI Vite.
 *
 * `VITE_SITE_URL`: origine pubblica (es. https://www.ianua.it) per robots.txt e sitemap.xml in dist.
 */
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const siteOrigin =
    env.VITE_SITE_URL?.trim().replace(/\/+$/, "") || "https://www.ianua.it";

  return {
    plugins: [react(), writeSeoFiles(siteOrigin)],
    base: "/",
  };
});
