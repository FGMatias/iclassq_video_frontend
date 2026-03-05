export interface LoginRequest {
  username: string
  password: string
}

export interface UserAuthResponse {
  token: string
  type: string
  id: number
  username: string
  name: string
  email: string
  roleId: number
  roleName: string
}

export interface AuthUser {
  id: number
  username: string
  name: string
  email: string
  roleId: number
  roleName: string
}
