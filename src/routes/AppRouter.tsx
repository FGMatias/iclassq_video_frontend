import { AuthLayout } from '@/layouts/AuthLayout'
import { LoginPage } from '@/pages/login/LoginPage'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'

export function AppRouter() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route
          path="/"
          element={
            <div className="flex min-h-screen items-center justify-center">
              <p className="text-muted-foreground">Dashboard proximamente</p>
            </div>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
