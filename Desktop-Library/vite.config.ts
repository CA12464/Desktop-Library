import { defineConfig } from 'vite';
import path from 'node:path';
import electron from 'vite-plugin-electron/simple';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    electron({
      main: {
        entry: 'electron/main.ts', // Entry for Electron main process
      },
      preload: {
        input: path.join(__dirname, 'electron/preload.ts'), // Path to preload script
      },
      renderer: process.env.NODE_ENV === 'test'
        ? undefined
        : {}, // Configure renderer process if not in test mode
    }),
  ],
  server: {
    port: 3000, // Ensure this matches your Electron config
    strictPort: true, // Enforce strict port usage
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});

