export interface BrowserStorageLike {
  getItem: (key: string) => string | null
  removeItem: (key: string) => void
  setItem: (key: string, value: string) => void
}

export function getBrowserStorage(): BrowserStorageLike | null {
  if (typeof window === 'undefined')
    return null

  try {
    return window.localStorage
  } catch {
    return null
  }
}

export function readStorage(key: string): string | null {
  try {
    return getBrowserStorage()?.getItem(key) ?? null
  } catch {
    return null
  }
}

export function writeStorage(key: string, value: string | null) {
  const storage = getBrowserStorage()
  if (!storage)
    return

  try {
    if (value === null)
      storage.removeItem(key)
    else
      storage.setItem(key, value)
  } catch {
    // Storage can be blocked or full. Keep the in-memory state usable.
  }
}
