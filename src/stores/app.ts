import type { ThemeMode } from '~/types/app'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { THEME_STORAGE_KEY } from '~/constants/app'
import { readStorage, writeStorage } from '~/utils/storage'

const defaultTheme: ThemeMode = 'light'

function normalizeTheme(value: string | null): ThemeMode {
  return value === 'dark' ? 'dark' : defaultTheme
}

function applyThemeDom(theme: ThemeMode) {
  if (typeof document === 'undefined')
    return

  document.documentElement.dataset.theme = theme
  document.documentElement.classList.toggle('theme-dark', theme === 'dark')
}

export const useAppStore = defineStore('app', () => {
  const theme = ref<ThemeMode>(defaultTheme)
  const themeLabel = computed(() => theme.value === 'dark' ? '切换浅色' : '切换深色')

  function setTheme(value: ThemeMode) {
    theme.value = normalizeTheme(value)
    writeStorage(THEME_STORAGE_KEY, theme.value)
    applyThemeDom(theme.value)
  }

  function toggleTheme() {
    setTheme(theme.value === 'dark' ? 'light' : 'dark')
  }

  function hydrateTheme() {
    setTheme(normalizeTheme(readStorage(THEME_STORAGE_KEY)))
  }

  return {
    hydrateTheme,
    setTheme,
    theme,
    themeLabel,
    toggleTheme,
  }
})
