import { useState } from 'react'

const subTabs = ['Custom', 'Packaged', 'Your recents']

function MenuSection() {
  const [activeTab, setActiveTab] = useState('Custom')

  return (
    <div>
      <div className="sub-tabs">
        {subTabs.map((tab) => (
          <button
            key={tab}
            className={`sub-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="menu-content">
        {activeTab === 'Custom' && <p>Custom order builder goes here (your existing OrderPage)</p>}
        {activeTab === 'Packaged' && <p>Pre-set combo meals go here</p>}
        {activeTab === 'Your recents' && <p>Recently ordered items go here</p>}
      </div>
    </div>
  )
}

export default MenuSection