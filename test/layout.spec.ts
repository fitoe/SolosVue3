import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import { createMemoryHistory, createRouter } from 'vue-router'
import App from '~/App.vue'

describe('app layouts', () => {
  it('renders the layout selected by route meta', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: '/', component: { template: '<main>Home</main>' }, meta: { layout: 'default' } },
        { path: '/blank', component: { template: '<main>Blank</main>' }, meta: { layout: 'blank' } },
      ],
    })
    const wrapper = mount(App, {
      global: {
        plugins: [createPinia(), router],
      },
    })

    await router.push('/')
    await router.isReady()
    expect(wrapper.text()).toContain('SolosVue3')
    expect(wrapper.text()).toContain('Home')

    await router.push('/blank')
    expect(wrapper.text()).not.toContain('SolosVue3')
    expect(wrapper.text()).toContain('Blank')
  })
})
