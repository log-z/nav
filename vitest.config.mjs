import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  test: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
