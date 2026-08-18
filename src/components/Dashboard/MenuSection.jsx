import { useState, useEffect, useRef } from 'react'
import OrderPage from '../../Pages/OrderPage.jsx'
import './MenuSection.css'

const subTabs = [
  { id: 'packaged', label: 'Packaged' },
  { id: 'custom', label: 'Custom' },
  { id: 'recent', label: 'Recent' },
]

function MenuSection({ onMenuToggle }) {
  const [activeTab, setActiveTab] = useState('packaged')
  const sectionRefs = useRef({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -50% 0px' }
    )

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div>
      <div className="sub-tabs sticky-sub-tabs">
        <button className="hamburger-btn" onClick={onMenuToggle} aria-label="Toggle menu">
          <span className="material-symbols-outlined">menu</span>
        </button>

        {subTabs.map((tab) => (
          <button
            key={tab.id}
            className={`sub-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => scrollToSection(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <section
        id="packaged"
        ref={(el) => (sectionRefs.current.packaged = el)}
        className="menu-section-block"
      >
        <h2 className="menu-section-heading">Packaged</h2>
        <p>Pre-set combo meals go here</p>
      </section>

      <section
        id="custom"
        ref={(el) => (sectionRefs.current.custom = el)}
        className="menu-section-block"
      >
        <h2 className="menu-section-heading">Custom</h2>
        <OrderPage />
      </section>

      <section
        id="recent"
        ref={(el) => (sectionRefs.current.recent = el)}
        className="menu-section-block"
      >
        <h2 className="menu-section-heading">Your recents</h2>
        <p>Recently ordered items go here</p>
      </section>
    </div>
  )
}

export default MenuSection