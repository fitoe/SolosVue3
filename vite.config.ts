import process from 'node:process'
import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'
import VueDevTools from 'vite-plugin-vue-devtools'
import VueLayouts from 'vite-plugin-vue-layouts'

export default defineConfig({
  plugins: [
    VueRouter({
      dts: 'src/types/typed-router.d.ts',
      routesFolder: 'src/pages',
    }),
    Vue(),
    VueLayouts({
      layoutsDirs: 'src/layouts',
      defaultLayout: 'default',
    }),
    AutoImport({
      dts: 'src/types/auto-imports.d.ts',
      imports: [
        'vue',
        'vue-router',
        'pinia',
      ],
      dirs: [
        'src/composables',
        'src/stores',
      ],
      vueTemplate: true,
    }),
    Components({
      dts: 'src/types/components.d.ts',
      dirs: ['src/components'],
    }),
    UnoCSS(),
    VueDevTools(),
  ],
  resolve: {
    alias: {
      '~': '/src',
      '@': '/src',
    },
  },
  server: {
    port: 5173,
    strictPort: false,
    proxy: process.env.VITE_PROXY_TARGET
      ? {
          '/api': {
            target: process.env.VITE_PROXY_TARGET,
            changeOrigin: true,
          },
        }
      : undefined,
  },
})
