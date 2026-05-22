import type { LoginPayload, LoginResponse, MinimalUser } from '~/types/auth'
import { alovaClient } from '~/api/client'
import { createRequestConfig } from '~/api/interceptors'

export function postLogin(payload: LoginPayload) {
  return alovaClient.Post<LoginResponse>('/auth/login', payload, createRequestConfig())
}

export function getCurrentUser() {
  return alovaClient.Get<MinimalUser>('/auth/me', createRequestConfig())
}
