import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useAuthModal } from '../context/AuthModalContext.jsx'
import './AuthModal.css'

function AuthModal() {
  const { isOpen, mode, setMode, closeModal } = useAuthModal()
  const { login, signup } = useAuth()

  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (mode === 'signup') {
        await signup(form)
      } else {
        await login(form)
      }
      closeModal()
      setForm({ name: '', email: '', password: '' })
    } catch (err) {
      if (err.status === 429) {
        setError('Too many attempts. Please wait 15 minutes and try again.')
      } else {
        setError(err.error || 'Something went wrong. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const switchMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login')
    setError('')
  }

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={closeModal}>×</button>

        <form className="auth-form" onSubmit={handleSubmit}>
          <h1 className="auth-title">
            {mode === 'login' ? 'Log in' : 'Create an account'}
          </h1>

          {mode === 'signup' && (
            <label className="auth-label">
              Name (optional)
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
            </label>
          )}

          <label className="auth-label">
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>

          <label className="auth-label">
            Password
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              minLength={mode === 'signup' ? 8 : undefined}
              required
            />
          </label>

          {error && <p className="auth-error">{error}</p>}

          <button className="auth-submit" type="submit" disabled={loading}>
            {loading
              ? mode === 'login' ? 'Logging in...' : 'Creating account...'
              : mode === 'login' ? 'Log in' : 'Sign up'}
          </button>

          <p className="auth-switch">
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <span className="auth-switch-link" onClick={switchMode}>
              {mode === 'login' ? 'Sign up' : 'Log in'}
            </span>
          </p>
        </form>
      </div>
    </div>
  )
}

export default AuthModal