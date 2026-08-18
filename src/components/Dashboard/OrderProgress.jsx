import { useState, useEffect } from 'react'
import './OrderProgress.css'

const API_BASE = 'https://payment-backend-2x5q.onrender.com'

const stages = [
  { key: 'success', label: 'Paid' },
  { key: 'preparing', label: 'Preparing' },
  { key: 'ready', label: 'Ready' },
  { key: 'picked_up', label: 'Picked up' },
  { key: 'completed', label: 'Completed' },
]

function OrderProgress({ onMenuToggle }) {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [confirmingId, setConfirmingId] = useState(null)

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/orders/mine`, {
        credentials: 'include',
      })
      if (!res.ok) throw new Error('Failed to load orders')
      const data = await res.json()
      setOrders(
        data.filter((o) => o.status !== 'completed' && o.status !== 'pending')
      )
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const confirmPickup = async (orderId) => {
    setConfirmingId(orderId)
    try {
      const res = await fetch(`${API_BASE}/api/orders/${orderId}/confirm`, {
        method: 'PUT',
        credentials: 'include',
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Could not confirm pickup')
      }
      await fetchOrders()
    } catch (err) {
      alert(err.message)
    } finally {
      setConfirmingId(null)
    }
  }

  return (
    <div>
      <div className="section-header">
        <button className="hamburger-btn" onClick={onMenuToggle} aria-label="Toggle menu">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <h2 className="section-title">Order progress</h2>
      </div>

      {loading && <p className="progress-status-msg">Loading...</p>}
      {error && <p className="progress-status-msg progress-error">{error}</p>}
      {!loading && !error && orders.length === 0 && (
        <p className="progress-status-msg">No pending orders right now.</p>
      )}

      {!loading && !error && orders.length > 0 && (
        <div className="progress-list">
          {orders.map((order) => {
            const currentIndex = stages.findIndex((s) => s.key === order.status)
            return (
              <div className="progress-card" key={order.id}>
                <p className="progress-card-id">{order.reference}</p>
                <div className="progress-bar">
                  {stages.map((stage, i) => (
                    <div
                      className={`progress-step ${i <= currentIndex ? 'done' : ''} ${i === currentIndex ? 'current' : ''}`}
                      key={stage.key}
                    >
                      <div className="progress-dot" />
                      {i < stages.length - 1 && <div className="progress-connector" />}
                      <p className="progress-label">{stage.label}</p>
                    </div>
                  ))}
                </div>

                {order.status === 'picked_up' && (
                  <button
                    className="confirm-pickup-btn"
                    onClick={() => confirmPickup(order.id)}
                    disabled={confirmingId === order.id}
                  >
                    {confirmingId === order.id ? 'Confirming...' : 'Confirm Pickup'}
                  </button>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default OrderProgress