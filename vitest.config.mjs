import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    alias: {
      "@": import.meta.dirname + "/src",
    },
  },
})
