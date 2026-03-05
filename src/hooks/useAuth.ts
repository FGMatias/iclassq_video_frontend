import { useAuthStore } from '@/stores/auth.store'
import { useSyncExternalStore } from 'react'

export function useAuth() {
  const state = useSyncExternalStore(useAuthStore.subscribe, () => useAuthStore.getState())

  return {
    user: state.user,
    token: state.token,
    isAuthenticated: !!state.token,
    login: useAuthStore.login,
    logout: useAuthStore.logout,
  }
}
