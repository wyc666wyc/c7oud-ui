import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
  build: {
    target: 'modules',
    outDir: 'es',
    minify: false,
    cssCodeSplit: true,
    rollupOptions: {
      external: ['vue'],
      input: 'src/index.ts',
      output: [
        {
          format: 'es',
          entryFileNames: '[name].js',
          preserveModules: true,
          dir: resolve(__dirname, './dist/es'),
          preserveModulesRoot: 'dist'
        },
        {
          format: 'cjs',
          entryFileNames: '[name].js',
          preserveModules: true,
          dir: resolve(__dirname, './dist/lib'),
          preserveModulesRoot: 'src'
        }
      ]
    },
    lib: {
      entry: './index.ts',
      formats: ['es', 'cjs']
    }
  },
  plugins: [
    vue(),
    dts({
      outputDir: resolve(__dirname, './dist/es'),
      tsConfigFilePath: '../../tsconfig.json'
    }),
    dts({
      outputDir: resolve(__dirname, './dist/lib'),
      tsConfigFilePath: '../../tsconfig.json',
    })
  ]
})