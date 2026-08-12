import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Hero from './components/Hero.jsx'
import OrderPage from './Pages/OrderPage.jsx'
import Dashboard from './Pages/Dashboard.jsx'
import AdminDashboard from './Pages/AdminDashboard.jsx'
import Navbar from './components/Navbar.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import Signup from './Pages/Signup.jsx'
import Login from './Pages/Login.jsx'

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={
          <div className="app">
            <Hero />
          </div>
        } />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App