import { createContext, useContext, useState } from 'react'

const API_BASE = 'https://payment-backend-2x5q.onrender.com'
const AdminAuthContext = createContext(null)

export function AdminAuthProvider({ children }) {
  const [adminKey, setAdminKey] = useState(
    sessionStorage.getItem('adminKey') || null
  )

  const verifyKey = async (key) => {
    // Adjust this endpoint path if your admin order-queue list route differs
    const res = await fetch(`${API_BASE}/api/admin/orders`, {
      headers: { 'x-admin-key': key },
    })

    if (res.ok) {
      sessionStorage.setItem('adminKey', key)
      setAdminKey(key)
      return true
    }

    const data = await res.json().catch(() => ({}))
    throw { status: res.status, error: data.error || 'Invalid admin key' }
  }

  const clearKey = () => {
    sessionStorage.removeItem('adminKey')
    setAdminKey(null)
  }

  return (
    <AdminAuthContext.Provider value={{ adminKey, verifyKey, clearKey }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  return useContext(AdminAuthContext)
}