import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import './Navbar.css'

function Navbar() {
  const { user, loading, logout } = useAuth()
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
            <Link to="/login" className="navbar-link">Log in</Link>
            <Link to="/signup" className="navbar-cta">Sign up</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default NavBar