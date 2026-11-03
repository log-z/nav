import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [vue()],
  resolve: {
    alias: {
      "@": import.meta.dirname + "/src",
    },
  },
  // https://vitest.dev/config/
  test: {
    dom: true,
  },
})
