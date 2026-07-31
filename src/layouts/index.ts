import BlankLayout from '~/layouts/blank.vue'
import DefaultLayout from '~/layouts/default.vue'

export const layouts = {
  blank: BlankLayout,
  default: DefaultLayout,
}

export type LayoutName = keyof typeof layouts
