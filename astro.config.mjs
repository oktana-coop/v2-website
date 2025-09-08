// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://v2editor.com",
  outDir: "./docs",
  vite: {
    plugins: [tailwindcss()],
  },
});
