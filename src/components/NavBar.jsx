import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import './NavBar.css'
import {useAuthModal} from '../context/AuthModalContext.jsx'

function NavBar() {
  const { user, loading, logout } = useAuth()
  const { openModal } = useAuthModal()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
     <nav className="navbar">
      <Link to="/" className="navbar-brand">Spag House</Link>

      <div className="navbar-actions">
        {loading ? null : user ? (
          <>
            <Link to="/dashboard" className="navbar-link">Hi, {user.name || user.email}</Link>
            <button className="navbar-cta" onClick={handleLogout}>Log out</button>
          </>
        ) : (
          <>
            <button className="navbar-link navbar-link-btn" onClick={() => openModal('login')}>
              Log in
            </button>
            <button className="navbar-cta" onClick={() => openModal('signup')}>
              Sign up
            </button>
          </>
        )}
      </div>
    </nav>
  )
}

export default NavBar