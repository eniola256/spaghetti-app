import OrderContent from '../Order/OrderContent.jsx'
import './MenuSection.css'

function MenuSection({ onMenuToggle }) {
  return (
    <div>
      <div className="section-header">
        <button className="hamburger-btn" onClick={onMenuToggle} aria-label="Toggle menu">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <h2 className="section-title">Menu</h2>
      </div>

      <OrderContent/>
    </div>
  )
}

export default MenuSection