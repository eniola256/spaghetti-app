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
  const [menuOpen, setMenuOpen] = useState(false)

  const goToProgress = (id) => {
    setActiveNav('progress')
    setSelectedOrderId(id)
    setMenuOpen(false)
  }

  const handleNavClick = (id) => {
    setActiveNav(id)
    setMenuOpen(false)
  }

  return (
    <div className="dashboard-shell">
      {menuOpen && (
        <div className="sidebar-overlay" onClick={() => setMenuOpen(false)} />
      )}

      <aside className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <button
            className="sidebar-close-btn"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {navItems.map((item) => (
          <button
            key={item.id}
            className={`sidebar-item ${activeNav === item.id ? 'active' : ''}`}
            onClick={() => handleNavClick(item.id)}
          >
            {item.label}
          </button>
        ))}
      </aside>

      <main className="dashboard-main">
        {activeNav === 'menu' && (
          <MenuSection onMenuToggle={() => setMenuOpen(true)} />
        )}
        {activeNav === 'orders' && (
          <OrderSection onSeeProgress={goToProgress} onMenuToggle={() => setMenuOpen(true)} />
        )}
        {activeNav === 'progress' && (
          <OrderProgress
            orderId={selectedOrderId}
            onBack={() => setActiveNav('orders')}
            onMenuToggle={() => setMenuOpen(true)}
          />
        )}
      </main>
    </div>
  )
}

export default Dashboard