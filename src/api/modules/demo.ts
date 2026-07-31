import type { DemoStatusResponse } from '~/types/api'

export function createLocalDemoStatus(): DemoStatusResponse {
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

export function getLocalDemoStatus() {
  return {
    async send() {
      return createLocalDemoStatus()
    },
  }
}
