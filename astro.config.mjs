import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import { fileURLToPath } from 'url';
import path from 'path';

import cloudflare from "@astrojs/cloudflare";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Production domain — used for canonical, og:url, sitemap, robots
// Change this if the final domain ever differs from firstupweddings.de.
export default defineConfig({
  site: 'https://firstupweddings.de',

  integrations: [tailwind({
    applyBaseStyles: false,
    configFile: path.resolve(__dirname, 'tailwind.config.mjs'),
  })],

  server: { port: 4322 },
  adapter: cloudflare()
});