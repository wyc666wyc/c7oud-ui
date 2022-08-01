import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  build: {
    target: 'modules',
    outDir: 'es',
    minify: false,
    cssCodeSplit: true,
    rollupOptions: {
      external: ['vue'],
      input: './src/index.ts',
      output: [
        {
          format: 'es',
          
        }
      ]
    },
    lib: {
      entry: './index.js',
      formats: ['es', 'cjs']
    }
  },
  plugins: [vue()]
})