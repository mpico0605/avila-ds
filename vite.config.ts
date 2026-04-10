import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      // Automatic JSX runtime — no need to import React in every file
      jsxRuntime: 'automatic',
    }),
  ],
});
