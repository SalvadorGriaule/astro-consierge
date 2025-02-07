// @ts-check
import { defineConfig } from 'astro/config';

import node from '@astrojs/node';

import tailwindcss from '@tailwindcss/vite';

import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
  output: 'server',

  adapter: node({
    mode: 'middleware'
  }),

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [svelte()]
});