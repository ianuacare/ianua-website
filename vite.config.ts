import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages project site: https://ianuacare.github.io/ianua-website/
export default defineConfig({
  plugins: [react()],
  base: "/ianua-website/",
});
