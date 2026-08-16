import { createContext, useContext, useState } from 'react'

const AuthModalContext = createContext(null)

export function AuthModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [mode, setMode] = useState('login') // 'login' | 'signup'

  const openModal = (initialMode = 'login') => {
    setMode(initialMode)
    setIsOpen(true)
  }

  const closeModal = () => setIsOpen(false)

  return (
    <AuthModalContext.Provider value={{ isOpen, mode, setMode, openModal, closeModal }}>
      {children}
    </AuthModalContext.Provider>
  )
}

export function useAuthModal() {
  return useContext(AuthModalContext)
}