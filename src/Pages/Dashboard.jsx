import { useState } from 'react'
import MenuSection from '../components/Dashboard/MenuSection.jsx'
import OrderSection from '../components/Dashboard/OrderSection.jsx'
import OrderProgress from '../components/Dashboard/OrderProgress.jsx'
import './Dashboard.css'

const navItems = [
  { id: 'menu', label: 'Menu' },
  { id: 'orders', label: 'Orders' },
  { id: 'progress', label: 'Order progress' },
]

function Dashboard() {
  const [activeNav, setActiveNav] = useState('menu')
  const [selectedOrderId, setSelectedOrderId] = useState(null)

  const goToProgress = (id) => {
    setActiveNav('progress')
    setSelectedOrderId(id)
  }

  return (
    <div className="dashboard-shell">
      <aside className="sidebar">
        <p className="sidebar-brand">Spag House</p>
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`sidebar-item ${activeNav === item.id ? 'active' : ''}`}
            onClick={() => setActiveNav(item.id)}
          >
            {item.label}
          </button>
        ))}
      </aside>

      <main className="dashboard-main">
        {activeNav === 'menu' && <MenuSection />}
        {activeNav === 'orders' && <OrderSection onSeeProgress={goToProgress} />}
        {activeNav === 'progress' && (
          <OrderProgress orderId={selectedOrderId} onBack={() => setActiveNav('orders')} />
        )}
      </main>
    </div>
  )
}

export default Dashboard