import api from '@/lib/axios'
import { LoginRequest, UserAuthResponse } from '@/types/auth.types'

export const authService = {
  login: async (data: LoginRequest): Promise<UserAuthResponse> => {
    const response = await api.post<UserAuthResponse>('/user/auth/login', data)

    return response.data
  },
}
