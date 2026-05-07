import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('tailwindcss').Config} */
export default {
  content: [path.join(__dirname, 'src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}')],
  theme: {
    extend: {
      colors: {
        brand: {
          cream: '#FAF8F5',
          warm: '#F2EDE8',
          dark: '#2C2C2C',
          muted: '#3D3D3D',
          text: '#4A4A4A',
          accent: '#D4A89A',
          'accent-hover': '#C49585',
          gold: '#C5A55A',
        },
      },
      fontFamily: {
        heading: ['"Cormorant Garamond"', 'serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
