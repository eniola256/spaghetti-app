import { Navigate } from 'react-router-dom'
import { useAdminAuth } from '../context/AdminAuthContext.jsx'

function RequireAdmin({ children }) {
  const { adminKey } = useAdminAuth()
  return adminKey ? children : <Navigate to="/admin-login" replace />
}

export default RequireAdmin