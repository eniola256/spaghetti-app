import { useState, useEffect } from 'react'
import './OrderSection.css'

const API_BASE = 'https://payment-backend-2x5q.onrender.com'

const statusLabels = {
  success: 'Paid',
  preparing: 'Preparing',
  ready: 'Ready',
  picked_up: 'Picked up',
}

function OrdersSection({ onSeeProgress, onMenuToggle }) {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch(`${API_BASE}/api/orders/mine`, {
          credentials: 'include',
        })
        if (!res.ok) throw new Error('Failed to load orders')
        const data = await res.json()
        setOrders(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [])

  const pending = orders.filter((o) => o.status !== 'picked_up')
  const delivered = orders.filter((o) => o.status === 'picked_up')

  const OrderCard = ({ order }) => (
    <div className="order-card">
      <div>
        <p className="order-card-ref">{order.reference}</p>
        <p className="order-card-amount">₦{(order.amount_kobo / 100).toLocaleString()}</p>
      </div>
      <span className={`status-badge status-${order.status}`}>
        {statusLabels[order.status]}
      </span>
      {order.status !== 'picked_up' && (
        <button
          className="see-progress-btn"
          onClick={() => onSeeProgress(order.id)}
        >
          See progress
        </button>
      )}
    </div>
  )

  return (
    <div className="orders-section">
      <div className="section-header">
        <button className="hamburger-btn" onClick={onMenuToggle} aria-label="Toggle menu">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <h2 className="section-title">Orders</h2>
      </div>

      {loading && <p className="orders-status-msg">Loading your orders...</p>}
      {error && <p className="orders-status-msg orders-error">{error}</p>}

      {!loading && !error && (
        <>
          <div className="orders-group">
            <h3 className="orders-group-title">Pending</h3>
            {pending.length === 0 && <p className="orders-empty">No pending orders</p>}
            <div className="orders-list">
              {pending.map((order) => <OrderCard order={order} key={order.id} />)}
            </div>
          </div>

          <div className="orders-group">
            <h3 className="orders-group-title">Delivered</h3>
            {delivered.length === 0 && <p className="orders-empty">No delivered orders yet</p>}
            <div className="orders-list">
              {delivered.map((order) => <OrderCard order={order} key={order.id} />)}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default OrdersSection