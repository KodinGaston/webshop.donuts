import { defineConfig } from 'vite';

export default defineConfig({
  base: './',  
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'main.js',  
        chunkFileNames: '[name].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'main.css';  
          }
          return '[name].[ext]';  
        },
      },
    },
  },
});
