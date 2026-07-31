<script setup lang="ts">
import { layouts } from '~/layouts'
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
