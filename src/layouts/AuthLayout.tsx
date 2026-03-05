import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <div className="bg-background min-h-screen">
      <Outlet />
    </div>
  )
}
