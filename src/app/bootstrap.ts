import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { setUnauthorizedHandler } from '~/api/client'
import { handleUnauthorized } from '~/api/interceptors'
import App from '~/App.vue'
import { createAppConfig } from '~/app/config'
import { registerGlobalErrorHandlers } from '~/app/error-handler'
import { applyRouterGuards } from '~/app/guard'
import { createAppRouter } from '~/app/router'
import { useAppStore } from '~/stores/app'
import { useAuthStore } from '~/stores/auth'
import '~/styles/index.css'
import 'uno.css'

export async function bootstrap() {
  const app = createApp(App)
  const pinia = createPinia()
  const router = createAppRouter()
  const config = createAppConfig()

  app.use(pinia)
  useAuthStore(pinia).hydrate()
  useAppStore(pinia).hydrateTheme()
  applyRouterGuards(router, config.appTitle)
  setUnauthorizedHandler(() => handleUnauthorized(router))
  registerGlobalErrorHandlers(app, router)

  app.use(router)
  await router.isReady()
  app.mount('#app')
}
