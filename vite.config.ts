import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/marketing-app/',
  server: {
    proxy: {
      '/api': {
        target: 'https://tz-front-jvqis72guq-lm.a.run.app/tz-front',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
