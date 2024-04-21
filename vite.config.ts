import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueDevTools from 'vite-plugin-vue-devtools';

const createAliasPath = (filePath: string) => fileURLToPath(
  new URL(filePath, import.meta.url),
);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueDevTools(),
  ],
  resolve: {
    alias: {
      '@app': createAliasPath('./packages/src'),
      '@core': createAliasPath('./packages/core'),
    },
  },
});
