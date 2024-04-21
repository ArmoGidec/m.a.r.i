import { fileURLToPath, URL } from 'node:url';

import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import VueDevTools from 'vite-plugin-vue-devtools';
import svgLoader from 'vite-svg-loader';

const createAliasPath = (filePath: string) => fileURLToPath(
  new URL(filePath, import.meta.url),
);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueDevTools(),
    svgLoader(),
  ],
  resolve: {
    alias: {
      '@app': createAliasPath('./packages/src'),
      '@core': createAliasPath('./packages/core'),
    },
  },
});
