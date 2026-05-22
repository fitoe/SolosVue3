import type { DemoStatusResponse } from '~/types/api'
import { createRequestConfig } from '~/api/interceptors'

export function createDemoStatus(): DemoStatusResponse {
  return {
    generatedAt: new Date().toISOString(),
    message: 'Demo request resolved. Replace this with your real backend.',
    stack: [
      {
        title: 'auth headers',
        detail: 'Authorization header is injected when token exists.',
      },
      {
        title: 'typed payload',
        detail: 'Methods return typed data through the request module boundary.',
      },
      {
        title: 'replace me',
        detail: 'Swap this method module with domain-specific endpoints.',
      },
    ],
  }
}

export function getDemoStatus() {
  return {
    config: createRequestConfig(),
    async send() {
      return createDemoStatus()
    },
  }
}
