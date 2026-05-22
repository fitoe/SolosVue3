import { createAlova } from 'alova'
import adapterFetch from 'alova/fetch'
import VueHook from 'alova/vue'
import { createApiError } from '~/api/interceptors'
import { createAppConfig } from '~/app/config'

const { apiBaseUrl } = createAppConfig()

export async function parseJsonResponse(response: Response) {
  if (response.status === 204)
    return null

  const text = await response.text()
  const body = text ? JSON.parse(text) as unknown : null

  if (!response.ok) {
    throw createApiError({
      ...(body && typeof body === 'object' ? body : {}),
      response,
      status: response.status,
    })
  }

  return body
}

export const alovaClient = createAlova({
  baseURL: apiBaseUrl,
  requestAdapter: adapterFetch(),
  responded: parseJsonResponse,
  statesHook: VueHook,
  timeout: 10000,
})
