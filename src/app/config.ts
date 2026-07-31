import type { AppConfig } from '~/types/app'
import { APP_NAME } from '~/constants/app'

function readEnv(name: string, fallback: string): string {
  const value = import.meta.env[name]
  return typeof value === 'string' && value.trim() ? value.trim() : fallback
}

function normalizeBaseUrl(value: string): string {
  const trimmed = value.trim()
  if (!trimmed || trimmed === '/')
    return ''

  return trimmed.replace(/\/$/, '')
}

export function createAppConfig(): AppConfig {
  return {
    apiBaseUrl: normalizeBaseUrl(readEnv('VITE_API_BASE_URL', '/api')),
    appTitle: readEnv('VITE_APP_TITLE', APP_NAME),
  }
}
