// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import netlify from '@astrojs/netlify';

export default defineConfig({
  site: 'https://v2editor.com',
  outDir: './dist',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    icon({
      iconDir: 'src/assets/icons',
    }),
  ],
  adapter: netlify(),
});
