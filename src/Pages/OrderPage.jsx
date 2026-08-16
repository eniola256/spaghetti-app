import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useAuthModal } from '../context/AuthModalContext.jsx'
import './OrderPage.css'

const API_BASE = 'https://payment-backend-2x5q.onrender.com'
const TAKEAWAY_CHARGE = 200 // display estimate only — backend adds the real fee

const items = [
  { id: 'spaghetti', name: 'Spaghetti', description: 'One portion of our signature tomato-sauced spaghetti.', price: 500, image: './spag.png', unit: 'portion' },
  { id: 'egg', name: 'Egg', description: 'A boiled egg, sliced and seasoned.', price: 300, image: './egg.png' },
  { id: 'fish', name: 'Fish', description: 'Pan-fried fish fillet, lightly spiced.', price: 800, image: './fish.png' },
  { id: 'plantain', name: 'Fried Plantain', description: 'Sweet ripe plantain, fried golden.', price: 500, image: './plantain.png' },
  { id: 'sausage', name: 'Sausage', description: 'Grilled sausage link, sliced.', price: 400, image: './sausage.png' },
]

function OrderPage() {
  const { user } = useAuth()
  const { openModal } = useAuthModal()

  const [quantities, setQuantities] = useState(
    Object.fromEntries(items.map((item) => [item.id, 0]))
  )
  const [checkoutError, setCheckoutError] = useState('')
  const [processing, setProcessing] = useState(false)

  const updateQty = (id, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, prev[id] + delta),
    }))
  }

  const spaghettiPortions = quantities['spaghetti']
  const itemsTotal = items.reduce((sum, item) => sum + item.price * quantities[item.id], 0)
  const takeawayTotal = TAKEAWAY_CHARGE * spaghettiPortions
  const total = itemsTotal + takeawayTotal
  const hasItems = itemsTotal > 0

  const handleCheckout = async () => {
    setCheckoutError('')

    if (!user) {
      openModal('login')
      return
    }

    setProcessing(true)
    try {
      const orderItems = items
        .filter((item) => quantities[item.id] > 0)
        .map((item) => ({ product_slug: item.id, quantity: quantities[item.id] }))

      const res = await fetch(`${API_BASE}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ items: orderItems }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Could not create order')

      const handler = window.PaystackPop.setup({
        key: data.public_key,
        email: data.email,
        amount: data.amount_kobo,
        ref: data.reference,
        callback: function () {
          // Payment popup reported success. The webhook (server-side)
          // is what actually confirms and updates order status —
          // this just tells the customer what to expect next.
          window.location.href = '/dashboard'
        },
        onClose: function () {
          setProcessing(false)
        },
      })

      handler.openIframe()
    } catch (err) {
      setCheckoutError(err.message)
      setProcessing(false)
    }
  }

  console.log('spaghettiPortions:', spaghettiPortions, 'takeawayTotal:', takeawayTotal)

  return (
    <section className="Order">
      <div className="order-page">
        <div className="order-main">
          <h1 className="order-title">Choose Dishes</h1>
          <div className="dish-grid">
            {items.map((item) => (
              <div className="dish-card" key={item.id}>
                <img src={item.image} alt={item.name} className="dish-img" />
                <p className="dish-name">
                  {item.name}
                  {item.unit && <span className="dish-unit"> (per {item.unit})</span>}
                </p>
                <p className="dish-desc">{item.description}</p>
                <div className="dish-footer">
                  <span className="dish-price">₦{item.price.toLocaleString()}</span>
                  <div className="quantity-control">
                    <button onClick={() => updateQty(item.id, -1)}>−</button>
                    <span>{quantities[item.id]}</span>
                    <button onClick={() => updateQty(item.id, 1)}>+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="order-summary-panel">
          <h3>Order Summary</h3>
          <div className="summary-items">
            {items
              .filter((item) => quantities[item.id] > 0)
              .map((item) => (
                <div className="summary-item-row" key={item.id}>
                  <img src={item.image} alt={item.name} className="summary-item-img" />
                  <div className="summary-item-info">
                    <p className="summary-item-name">{item.name}</p>
                    <p className="summary-item-price">₦{item.price.toLocaleString()}</p>
                  </div>
                  <div className="summary-item-qty">
                    <button onClick={() => updateQty(item.id, -1)}>−</button>
                    <span>{quantities[item.id]}</span>
                    <button onClick={() => updateQty(item.id, 1)}>+</button>
                  </div>
                  <span className="summary-item-total">
                    ₦{(item.price * quantities[item.id]).toLocaleString()}
                  </span>
                </div>
              ))}
          </div>

          {!hasItems && <p className="summary-empty">Your order is empty</p>}

          <div className="summary-divider" />

          {spaghettiPortions > 0 && (
            <div className="summary-line">
              <span>Takeaway fee (est.)</span>
              <span>₦{takeawayTotal.toLocaleString()}</span>
            </div>
          )}
          <div className="summary-line summary-total">
            <span>Total (est.)</span>
            <span>₦{total.toLocaleString()}</span>
          </div>

          {checkoutError && <p className="checkout-error">{checkoutError}</p>}

          <button
            className="checkout-btn"
            disabled={!hasItems || processing}
            onClick={handleCheckout}
          >
            {processing ? 'Processing...' : 'Continue to Payment'}
          </button>
        </aside>
      </div>
    </section>
  )
}

export default OrderPage