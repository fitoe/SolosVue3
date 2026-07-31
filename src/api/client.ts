import { createAlova } from 'alova'
import adapterFetch from 'alova/fetch'
import VueHook from 'alova/vue'
import { createApiError } from '~/api/interceptors'
import { createAppConfig } from '~/app/config'
import { useAuthStore } from '~/stores/auth'

const { apiBaseUrl } = createAppConfig()
let unauthorizedHandler: (() => void | Promise<void>) | undefined

export function setUnauthorizedHandler(handler?: () => void | Promise<void>) {
  unauthorizedHandler = handler
}

async function parseResponseBody(response: Response): Promise<unknown> {
  const text = await response.text()
  if (!text)
    return null

  const contentType = response.headers.get('content-type') ?? ''
  const firstCharacter = text.trimStart()[0]
  const looksLikeJson = firstCharacter === '{' || firstCharacter === '['
  if (!contentType.includes('json') && !looksLikeJson)
    return text

  try {
    return JSON.parse(text) as unknown
  } catch {
    throw createApiError({
      message: 'Server returned invalid JSON',
      response,
      status: response.status,
    })
  }
}

export async function parseJsonResponse(response: Response) {
  if (response.status === 204)
    return null

  if (response.status === 401)
    await unauthorizedHandler?.()

  const body = await parseResponseBody(response)

  if (!response.ok) {
    throw createApiError({
      ...(body && typeof body === 'object' ? body : { message: typeof body === 'string' ? body : undefined }),
      response,
      status: response.status,
    })
  }

  return body
}

export const alovaClient = createAlova({
  baseURL: apiBaseUrl,
  beforeRequest(method) {
    const token = useAuthStore().token
    if (token && !method.config.headers.Authorization)
      method.config.headers.Authorization = `Bearer ${token}`
  },
  requestAdapter: adapterFetch(),
  responded: parseJsonResponse,
  statesHook: VueHook,
  timeout: 10000,
})
