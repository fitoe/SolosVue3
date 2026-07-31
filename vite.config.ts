import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig, loadEnv } from 'vite'
import VueDevTools from 'vite-plugin-vue-devtools'
import VueRouter from 'vue-router/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '')

  return {
    plugins: [
      VueRouter({
        dts: 'src/types/typed-router.d.ts',
        routesFolder: 'src/pages',
      }),
      Vue(),
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
      proxy: env.VITE_PROXY_TARGET
        ? {
            '/api': {
              target: env.VITE_PROXY_TARGET,
              changeOrigin: true,
            },
          }
        : undefined,
    },
  }
})
