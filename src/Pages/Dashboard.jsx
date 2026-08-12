import { useState } from 'react'
import MenuSection from '../components/dashboard/MenuSection.jsx'
import './Dashboard.css'

const navItems = [
  { id: 'menu', label: 'Menu', icon: 'toolsKitchen2' },
  { id: 'history', label: 'History', icon: 'history' },
  { id: 'progress', label: 'Order progress', icon: 'truck-delivery' },
]

function Dashboard() {
  const [activeNav, setActiveNav] = useState('menu')

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
        {activeNav === 'history' && <p>History section — next up</p>}
        {activeNav === 'progress' && <p>Order progress section — next up</p>}
      </main>
    </div>
  )
}

export default Dashboard