import { defineConfig } from 'vite';

export default defineConfig({
  base: '/',
  css: {
    postcss: './postcss.config.js',
  },
});
