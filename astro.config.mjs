import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import dotenv from 'dotenv';

import react from '@astrojs/react';

// Load environment variables from .env file
dotenv.config();

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],
  output: 'static',
  build: {
    format: 'file'
  },
  site: 'https://marksman3924.github.io',
  base: 'TNConsultant'
});