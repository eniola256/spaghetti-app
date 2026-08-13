import { useState, useEffect } from 'react'
import { useAdminAuth } from '../context/AdminAuthContext.jsx'
import './AdminDashboard.css'

const API_BASE = 'https://payment-backend-2x5q.onrender.com'

const statuses = [
  { key: 'paid', label: 'Paid' },
  { key: 'preparing', label: 'Preparing' },
  { key: 'ready', label: 'Ready' },
  { key: 'picked_up', label: 'Picked up' },
]

const navItems = [
  { id: 'queue', label: 'Order queue' },
  { id: 'history', label: 'History' },
]

function AdminDashboard() {
  const { adminKey } = useAdminAuth()
  const [activeNav, setActiveNav] = useState('queue')
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true)
      setError('')
      try {
        const res = await fetch(`${API_BASE}/api/admin/orders`, {
          headers: { 'x-admin-key': adminKey },
        })
        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          throw new Error(data.error || 'Failed to load orders')
        }
        const data = await res.json()
        setOrders(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (adminKey) fetchOrders()
  }, [adminKey])

  // Formats a backend order's line items into a short readable string.
  // Adjust this if your order object's shape is different from
  // { items: [{ name, quantity }] }
  const formatItems = (order) => {
    if (!order.items) return ''
    if (typeof order.items === 'string') return order.items
    return order.items.map((i) => `${i.name} x${i.quantity}`).join(', ')
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <p className="admin-brand">Spag Admin</p>
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`admin-sidebar-item ${activeNav === item.id ? 'active' : ''}`}
            onClick={() => setActiveNav(item.id)}
          >
            {item.label}
          </button>
        ))}
      </aside>

      <main className="admin-main">
        {activeNav === 'queue' ? (
          <>
            <h2 className="admin-section-title">Order queue</h2>

            {loading && <p className="admin-status-msg">Loading orders...</p>}
            {error && <p className="admin-status-msg admin-error">{error}</p>}

            {!loading && !error && (
              <div className="kanban">
                {statuses.map((status) => (
                  <div className="kanban-col" key={status.key}>
                    <p className={`kanban-col-label status-${status.key}`}>
                      {status.label}
                    </p>
                    {orders
                      .filter((order) => order.status === status.key)
                      .map((order) => (
                        <div className="kanban-card" key={order.id}>
                          <p className="kanban-card-id">#{order.id}</p>
                          <p className="kanban-card-items">{formatItems(order)}</p>
                        </div>
                      ))}
                    {orders.filter((o) => o.status === status.key).length === 0 && (
                      <p className="kanban-empty">No orders</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <p>History section — next up</p>
        )}
      </main>
    </div>
  )
}

export default AdminDashboard