import type { Router } from 'vue-router'
import type { ApiError } from '~/types/api'
import { LOGIN_PATH } from '~/constants/routes'
import { useAuthStore } from '~/stores/auth'

interface ResponseLike {
  status?: number
  statusText?: string
}

interface ErrorLike {
  code?: string | number
  message?: string
  name?: string
  response?: ResponseLike
  status?: number
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object'
}

function pickMessage(value: Record<string, unknown>, fallback: string): string {
  for (const key of ['message', 'msg', 'error']) {
    const candidate = value[key]
    if (typeof candidate === 'string' && candidate.trim())
      return candidate
  }

  return fallback
}

export function createApiError(error: unknown): ApiError {
  if (typeof error === 'string')
    return { code: 'UNKNOWN_ERROR', message: error }

  if (error instanceof Response) {
    return {
      code: error.status || 'HTTP_ERROR',
      message: error.statusText || 'Request failed',
      status: error.status,
    }
  }

  if (!isRecord(error))
    return { code: 'UNKNOWN_ERROR', message: 'Unexpected request error' }

  const errorLike = error as ErrorLike
  const response = errorLike.response
  const status = errorLike.status ?? response?.status
  const code = errorLike.code ?? status ?? 'UNKNOWN_ERROR'
  const fallback = response?.statusText || errorLike.name || 'Request failed'

  return {
    code,
    message: pickMessage(error, fallback),
    ...(status ? { status } : {}),
  }
}

export async function handleUnauthorized(router: Router) {
  const auth = useAuthStore()
  const redirect = router.currentRoute.value.fullPath
  auth.clearAuth()
  await router.push({
    path: LOGIN_PATH,
    query: redirect && redirect !== LOGIN_PATH ? { redirect } : {},
  })
}
