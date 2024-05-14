import { defineConfig } from 'vite';
const path = require("path");
import vue from '@vitejs/plugin-vue';
// import { createVuePlugin as vue } from "vite-plugin-vue2";

// https://vitejs.dev/config/
export default defineConfig({
	base: '/vue-nice-validate/',
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'VueNiceValidate'
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
});