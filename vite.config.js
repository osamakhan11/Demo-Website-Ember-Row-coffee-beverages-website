import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Keep the 3D engine in its own chunk so the page shell loads first.
        manualChunks: { three: ['three', '@react-three/fiber', '@react-three/drei'] },
      },
    },
  },
})
