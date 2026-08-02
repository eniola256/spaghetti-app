import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Hero from './components/Hero.jsx'
import OrderPage from './components/OrderPage.jsx'
import './App.css'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              className="page-wrapper"
              exit={{ y: '-100%' }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            >
              <Hero />
            </motion.div>
          }
        />
        <Route
          path="/order"
          element={
            <motion.div
              className="page-wrapper"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            >
              <OrderPage />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <div className="shared-background">
          <img src="/spag2.png" alt="" className="spag-img-shared" />
        </div>
        <AnimatedRoutes />
      </div>
    </BrowserRouter>
  )
}

export default App