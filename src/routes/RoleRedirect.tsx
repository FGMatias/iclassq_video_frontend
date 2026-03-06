import { getNavigation } from '@/components/layout/sidebar-nav'
import { useAuth } from '@/hooks/useAuth'
import { Navigate } from 'react-router-dom'

export function RoleRedirect() {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  const nav = getNavigation(user.roleName)
  return <Navigate to={nav.defaultPath} replace />
}
