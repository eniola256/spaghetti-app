import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Hero from './components/Hero.jsx'
import OrderPage from './components/OrderPage.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div className="app">
            <Hero />
          </div>
        } />
        <Route path="/order" element={<OrderPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App