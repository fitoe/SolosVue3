import type { LayoutName } from '~/layouts'
import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    requiresAuth?: boolean
    guestOnly?: boolean
    layout?: LayoutName
  }
}

export {}
