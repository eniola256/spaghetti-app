import { useState } from 'react'
import './AdminDashboard.css'

const statuses = [
  { key: 'paid', label: 'Paid' },
  { key: 'preparing', label: 'Preparing' },
  { key: 'ready', label: 'Ready' },
  { key: 'picked_up', label: 'Picked up' },
]

const mockOrders = [
  { id: 1043, items: 'Spag x1', status: 'paid' },
  { id: 1042, items: 'Spag x2, Fish', status: 'preparing' },
  { id: 1038, items: 'Spag x1, Plantain', status: 'ready' },
  { id: 1021, items: 'Spag x1', status: 'picked_up' },
]

const navItems = [
  { id: 'queue', label: 'Order queue' },
  { id: 'history', label: 'History' },
]

function AdminDashboard() {
  const [activeNav, setActiveNav] = useState('queue')

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
            <div className="kanban">
              {statuses.map((status) => (
                <div className="kanban-col" key={status.key}>
                  <p className={`kanban-col-label status-${status.key}`}>{status.label}</p>
                  {mockOrders
                    .filter((order) => order.status === status.key)
                    .map((order) => (
                      <div className="kanban-card" key={order.id}>
                        <p className="kanban-card-id">#{order.id}</p>
                        <p className="kanban-card-items">{order.items}</p>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </>
        ) : (
          <p>History section — next up</p>
        )}
      </main>
    </div>
  )
}

export default AdminDashboard