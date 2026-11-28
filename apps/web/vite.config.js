import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = { ...loadEnv(mode, process.cwd(), 'VITE_'), ...process.env };
  return {
    plugins: [react()],
    optimizeDeps: {
      exclude: ['maplibre-gl'],
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes('node_modules')) return undefined;
            if (id.includes('/node_modules/three/')) return 'vendor-three';
            if (id.includes('/node_modules/gsap/') || id.includes('/node_modules/lenis/')) return 'vendor-motion';
            if (
              id.includes('/node_modules/react/') ||
              id.includes('/node_modules/react-dom/') ||
              id.includes('/node_modules/react-router') ||
              id.includes('/node_modules/@remix-run/') ||
              id.includes('/node_modules/scheduler/')
            ) {
              return 'vendor-react';
            }
            return undefined;
          },
        },
      },
    },
    server: {
      host: '127.0.0.1',
      port: 3000,
      open: false,
      proxy: env.VITE_HANOI_SYNTHETIC_INTAKE === 'true' ? {
        '^/api/v1/leads$': { target: 'http://127.0.0.1:3103' },
      } : undefined,
    },
  };
});
