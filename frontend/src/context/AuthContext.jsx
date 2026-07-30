import { createContext, useState, useEffect, useContext } from 'react'
import { API_BASE_URL } from '../config'
const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [owner, setOwner] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('ownerToken') || null)
  const [loading, setLoading] = useState(true)

  // Modal state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authModalMode, setAuthModalMode] = useState('login') // 'login' or 'register'

  const openAuthModal = (mode = 'login') => {
    setAuthModalMode(mode)
    setIsAuthModalOpen(true)
  }

  const closeAuthModal = () => {
    setIsAuthModalOpen(false)
  }

  // Fetch owner details on load if token exists
  useEffect(() => {
    const fetchMe = async () => {
      if (!token) {
        setLoading(false)
        return
      }

      try {
        const res = await fetch(`${API_BASE_URL}/api/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if (res.ok) {
          const data = await res.json()
          setOwner(data)
        } else {
          logout()
        }
      } catch (err) {
        console.error('Failed to fetch user:', err)
        logout()
      } finally {
        setLoading(false)
      }
    }

    fetchMe()
  }, [token])

  const login = (data) => {
    localStorage.setItem('ownerToken', data.token)
    setToken(data.token)
    setOwner({
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role
    })
    closeAuthModal()
  }

  const logout = () => {
    localStorage.removeItem('ownerToken')
    setToken(null)
    setOwner(null)
  }

  return (
    <AuthContext.Provider value={{
      owner,
      token,
      loading,
      login,
      logout,
      isAuthModalOpen,
      authModalMode,
      setAuthModalMode,
      openAuthModal,
      closeAuthModal
    }}>
      {children}
    </AuthContext.Provider>
  )
}
