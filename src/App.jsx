import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Hero from './components/Hero.jsx'
import Dashboard from './Pages/Dashboard.jsx'
import AdminDashboard from './Pages/AdminDashboard.jsx'
import NavBar from './components/NavBar.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { AdminAuthProvider } from './context/AdminAuthContext.jsx'
import AdminLogin from './Pages/AdminLogin.jsx'
import RequireAdmin from './components/RequireAdmin.jsx'
import { AuthModalProvider } from './context/AuthModalContext.jsx'
import AuthModal from './components/AuthModal.jsx'

function App() {
  return (
    <AuthProvider>
      <AdminAuthProvider>
        <AuthModalProvider>
          <BrowserRouter>

            <div className="app">
              <NavBar />
              <AuthModal />
              <Routes>
                <Route path="/" element={<Hero />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route
                  path="/admin"
                  element={
                    <RequireAdmin>
                      <AdminDashboard />
                    </RequireAdmin>
                  }
                />
              </Routes>
            </div>
          </BrowserRouter>
        </AuthModalProvider>
      </AdminAuthProvider>
    </AuthProvider>
  )
}

export default App