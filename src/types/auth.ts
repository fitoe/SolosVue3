export interface MinimalUser {
  id: string
  name: string
}

export interface AuthState {
  token: string | null
  user: MinimalUser | null
  isAuthenticated: boolean
}

export interface LoginPayload {
  password: string
  username: string
}

export interface LoginResponse {
  token: string
  user: MinimalUser
}
