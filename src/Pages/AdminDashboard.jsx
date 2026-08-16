import { useState, useEffect } from 'react'
import { useAdminAuth } from '../context/AdminAuthContext.jsx'
import './AdminDashboard.css'

const API_BASE = 'https://payment-backend-2x5q.onrender.com'

const nextStatus = {
  success: 'preparing',
  preparing: 'ready',
  ready: 'picked_up',
}

const nextLabel = {
  success: 'Start preparing',
  preparing: 'Mark ready',
  ready: 'Mark picked up',
}

const navItems = [
  { id: 'queue', label: 'Order queue' },
  { id: 'waiting', label: 'Waiting for pickup' },
  { id: 'history', label: 'History' },
]

function AdminDashboard() {
  const { adminKey } = useAdminAuth()
  const [activeNav, setActiveNav] = useState('queue')
  const [activeOrders, setActiveOrders] = useState([])
  const [historyOrders, setHistoryOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [updatingId, setUpdatingId] = useState(null)

  const formatItems = (items) =>
    items.map((i) => `${i.name} x${i.quantity}`).join(', ')

  const fetchWithDetails = async (url) => {
    const res = await fetch(url, { headers: { 'x-admin-key': adminKey } })
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      throw new Error(data.error || 'Failed to load orders')
    }
    const list = await res.json()

    // The list endpoint has no items — fetch each order's detail in
    // parallel to get customer name + dish contents for the cards.
    const detailed = await Promise.all(
      list.map(async (order) => {
        const detailRes = await fetch(`${API_BASE}/api/orders/${order.id}`, {
          headers: { 'x-admin-key': adminKey },
        })
        const detail = await detailRes.json()
        return detail
      })
    )
    return detailed
  }

  const loadAll = async () => {
    setLoading(true)
    setError('')
    try {
      const [active, history] = await Promise.all([
        fetchWithDetails(`${API_BASE}/api/orders`),
        fetchWithDetails(`${API_BASE}/api/orders?status=completed`),
      ])
      setActiveOrders(active)
      setHistoryOrders(history)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (adminKey) loadAll()
  }, [adminKey])

  const advanceStatus = async (order) => {
    const newStatus = nextStatus[order.status]
    if (!newStatus) return

    setUpdatingId(order.id)
    try {
      const res = await fetch(`${API_BASE}/api/orders/${order.id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': adminKey,
        },
        body: JSON.stringify({ status: newStatus }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Failed to update status')
      }
      // Re-fetch everything — simplest way to keep both lists (and the
      // customer_name/items detail) correctly in sync after a move.
      await loadAll()
    } catch (err) {
      alert(err.message)
    } finally {
      setUpdatingId(null)
    }
  }

  const queueOrders = activeOrders.filter((o) => ['success', 'preparing'].includes(o.status))
  const waitingOrders = activeOrders.filter((o) => ['ready', 'picked_up'].includes(o.status))

  const OrderCard = ({ order }) => (
    <div className={`order-card-v2 ${order.status === 'completed' ? 'completed' : ''}`}>
      <p className="order-customer-name">{order.customer_name_from_account || order.customer_email}</p>
      <p className="order-customer-email">{order.customer_email}</p>
      <p className="order-items-list">{formatItems(order.items)}</p>

      {nextStatus[order.status] && (
        <button
          className="order-action-btn"
          onClick={() => advanceStatus(order)}
          disabled={updatingId === order.id}
        >
          {updatingId === order.id ? 'Updating...' : nextLabel[order.status]}
        </button>
      )}

      {order.status === 'picked_up' && (
        <span className="order-waiting-badge">Waiting for customer to confirm</span>
      )}

      {order.status === 'completed' && (
        <button className="order-action-btn completed-btn" disabled>
          Order completed
        </button>
      )}
    </div>
  )

  const renderList = (list, emptyMessage) => (
    <div className="order-card-list">
      {list.length === 0 && <p className="admin-status-msg">{emptyMessage}</p>}
      {list.map((order) => <OrderCard order={order} key={order.id} />)}
    </div>
  )

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
        {loading && <p className="admin-status-msg">Loading orders...</p>}
        {error && <p className="admin-status-msg admin-error">{error}</p>}

        {!loading && !error && (
          <>
            {activeNav === 'queue' && (
              <>
                <h2 className="admin-section-title">Order queue</h2>
                {renderList(queueOrders, 'No orders waiting to be prepared')}
              </>
            )}
            {activeNav === 'waiting' && (
              <>
                <h2 className="admin-section-title">Waiting for pickup</h2>
                {renderList(waitingOrders, 'No orders currently waiting')}
              </>
            )}
            {activeNav === 'history' && (
              <>
                <h2 className="admin-section-title">History</h2>
                {renderList(historyOrders, 'No completed orders yet')}
              </>
            )}
          </>
        )}
      </main>
    </div>
  )
}

export default AdminDashboard