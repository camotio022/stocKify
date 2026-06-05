import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // 🔥 Corrigido: Apenas uma declaração limpa da função
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // 1. Isola o Material UI
            if (id.includes('@mui')) return 'vendor-mui';

            // 2. Isola o Firebase
            if (id.includes('firebase')) return 'vendor-firebase';

            // 3. 🎯 ISOLAMENTO CIRÚRGICO: html2canvas isolado do resto
            if (id.includes('html2canvas')) return 'vendor-html2canvas';

            // 4. O restante das libs menores do node_modules fica aqui
            return 'vendor-core-libs';
          }
        }
      }
    }
  }
});