import { createPinia, setActivePinia } from 'pinia'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { AUTH_STORAGE_KEY, USER_STORAGE_KEY } from '~/constants/app'
import { useAuthStore } from '~/stores/auth'
import { readStorage, writeStorage } from '~/utils/storage'

describe('auth store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('persists token changes', () => {
    const auth = useAuthStore()
    auth.setToken('hello')

    expect(localStorage.getItem(AUTH_STORAGE_KEY)).toBe('hello')
    expect(auth.isAuthenticated).toBe(true)
  })

  it('persists and hydrates user changes', () => {
    localStorage.setItem(AUTH_STORAGE_KEY, 'persisted')
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify({ id: '1', name: 'Solo' }))
    const auth = useAuthStore()

    auth.hydrate()

    expect(auth.token).toBe('persisted')
    expect(auth.user).toEqual({ id: '1', name: 'Solo' })
  })

  it('clears auth state', () => {
    const auth = useAuthStore()
    auth.setToken('hello')
    auth.setUser({ id: '1', name: 'Solo' })

    auth.clearAuth()

    expect(localStorage.getItem(AUTH_STORAGE_KEY)).toBeNull()
    expect(localStorage.getItem(USER_STORAGE_KEY)).toBeNull()
    expect(auth.user).toBeNull()
    expect(auth.isAuthenticated).toBe(false)
  })

  it('ignores malformed stored users', () => {
    localStorage.setItem(USER_STORAGE_KEY, '{bad json')
    const auth = useAuthStore()

    auth.hydrate()

    expect(auth.user).toBeNull()
  })

  it('keeps working when browser storage is unavailable', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new DOMException('Blocked')
    })
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('Quota exceeded')
    })

    expect(readStorage('blocked')).toBeNull()
    expect(() => writeStorage('blocked', 'value')).not.toThrow()
  })
})
