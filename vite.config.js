import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',   // default is dist, fine
    chunkSizeWarningLimit: 2000 // increase if you get warnings about big files
  }
});