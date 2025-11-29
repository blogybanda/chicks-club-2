import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Cast process to any to avoid TS error if Node types are missing in the environment configuration
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    plugins: [react()],
    // We remove the manual alias for three/addons as modern three.js handles this automatically.
    // Manual resolution often fails in CI/CD environments like Vercel.
    resolve: {
      alias: {
        // No manual aliases needed for standard imports
      },
    },
    define: {
      // We ONLY replace the specific API key string. 
      // Do NOT define 'process.env': {} here as it conflicts with the specific key replacement.
      'process.env.API_KEY': JSON.stringify(env.API_KEY || env.VITE_API_KEY),
    },
    build: {
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'three', 'recharts', 'lucide-react', '@google/genai']
          }
        }
      }
    }
  };
});