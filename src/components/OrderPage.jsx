import { useState } from 'react'
import './OrderPage.css'

const TAKEAWAY_CHARGE = 200

const items = [
  {
    id: 'spaghetti',
    name: 'Spaghetti',
    description: 'One portion of our signature tomato-sauced spaghetti.',
    price: 500,
    image: './spag.png',
    unit: 'portion',
  },
  {
    id: 'egg',
    name: 'Egg',
    description: 'A boiled egg, sliced and seasoned.',
    price: 300,
    image: './egg.png ',
  },
  {
    id: 'fish',
    name: 'Fish',
    description: 'Pan-fried fish fillet, lightly spiced.',
    price: 800,
    image: './fish.png',
  },
  {
    id: 'plantain',
    name: 'Fried Plantain',
    description: 'Sweet ripe plantain, fried golden.',
    price: 500,
    image: './plantain.png',
  },
  {
    id: 'sausage',
    name: 'Sausage',
    description: 'Grilled sausage link, sliced.',
    price: 400,
    image: './sausage.png',
  },
]

function OrderPage() {
  const [quantities, setQuantities] = useState(
    Object.fromEntries(items.map((item) => [item.id, 0]))
  )

  const updateQty = (id, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, prev[id] + delta),
    }))
  }

  const spaghettiPortions = quantities['spaghetti']

  const itemsTotal = items.reduce(
    (sum, item) => sum + item.price * quantities[item.id],
    0
  )

  const takeawayTotal = TAKEAWAY_CHARGE * spaghettiPortions
  const total = itemsTotal + takeawayTotal
  const hasItems = itemsTotal > 0

  return (
    <section className='Order'>
    <div className="order-page">
      <div className="order-main">
        <h1 className="order-title">Build Your Order</h1>

        <div className="item-list">
          {items.map((item) => (
            <div className="item-row" key={item.id}>
              <img src={item.image} alt={item.name} className="item-img" />
              <div className="item-info">
                <h3 className="item-name">
                  {item.name}
                  {item.unit && <span className="item-unit"> (per {item.unit})</span>}
                </h3>
                <p className="item-desc">{item.description}</p>
                <p className="item-price">₦{item.price.toLocaleString()}</p>
              </div>
              <div className="quantity-control">
                <button onClick={() => updateQty(item.id, -1)}>−</button>
                <span>{quantities[item.id]}</span>
                <button onClick={() => updateQty(item.id, 1)}>+</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <aside className="order-summary-panel">
        <h3>Order Summary</h3>
        {items
          .filter((item) => quantities[item.id] > 0)
          .map((item) => (
            <div className="summary-line" key={item.id}>
              <span>{item.name} x{quantities[item.id]}</span>
              <span>₦{(item.price * quantities[item.id]).toLocaleString()}</span>
            </div>
          ))}
        {spaghettiPortions > 0 && (
          <div className="summary-line">
            <span>Takeaway fee x{spaghettiPortions}</span>
            <span>₦{takeawayTotal.toLocaleString()}</span>
          </div>
        )}
        {!hasItems && <p className="summary-empty">Your order is empty</p>}
        <div className="summary-divider" />
        <div className="summary-total">
          <span>Total</span>
          <span>₦{total.toLocaleString()}</span>
        </div>
        <button className="checkout-btn" disabled={!hasItems}>
          Proceed to Pay
        </button>
      </aside>
    </div>
    </section>
  )
}

export default OrderPage