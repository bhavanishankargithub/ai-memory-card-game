import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/** Must match the GitHub repository name for project Pages */
const REPO_NAME = 'ai-memory-card-game'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // Project Pages URL: https://<user>.github.io/<repo>/
  base: command === 'build' ? `/${REPO_NAME}/` : '/',
  plugins: [react(), tailwindcss()],
}))
