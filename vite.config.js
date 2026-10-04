import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import fs from 'node:fs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
    {
      name: 'spa-404-fallback',
      writeBundle(options) {
        const outputDir = options.dir || path.resolve('dist')
        const indexPath = path.join(outputDir, 'index.html')
        if (fs.existsSync(indexPath)) {
          fs.copyFileSync(indexPath, path.join(outputDir, '404.html'))
        }
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
})
