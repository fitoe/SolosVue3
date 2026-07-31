<script setup lang="ts">
import BlankLayout from '~/layouts/blank.vue'
import DefaultLayout from '~/layouts/default.vue'

const layouts = {
  blank: BlankLayout,
  default: DefaultLayout,
}
</script>

<template>
  <div class="app-shell">
    <RouterView v-slot="{ Component, route }">
      <component :is="layouts[route.meta.layout ?? 'default']">
        <component :is="Component" />
      </component>
    </RouterView>
  </div>
</template>
