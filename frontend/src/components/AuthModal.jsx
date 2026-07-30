import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { X, Building2, UtensilsCrossed, Loader2, User, Eye, EyeOff } from 'lucide-react'

import { API_BASE_URL } from '../config'

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, authModalMode, setAuthModalMode, login } = useAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'PG_OWNER'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  if (!isAuthModalOpen) return null

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const endpoint = authModalMode === 'login' ? '/api/auth/login' : '/api/auth/register'
    const payload = authModalMode === 'login' 
      ? { email: formData.email, password: formData.password }
      : formData

    try {
      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const data = await res.json()

      if (res.ok) {
        login(data)
        // Redirect based on role
        if (data.role === 'PG_OWNER') {
          navigate('/dashboard/pg')
        } else if (data.role === 'RESTAURANT_OWNER') {
          navigate('/dashboard/restaurant')
        } else {
          navigate('/')
        }
      } else {
        setError(data.message || 'Something went wrong')
      }
    } catch (err) {
      setError('Network error. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/60 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto relative animate-fadeInUp [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        
        {/* Close Button */}
        <button 
          onClick={closeAuthModal}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-page text-muted hover:bg-red-50 hover:text-red-500 hover:rotate-90 transition-all duration-300 z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          <div className="text-center mb-6 mt-2">
            <h2 className="font-sora font-bold text-2xl text-navy mb-2">
              {authModalMode === 'login' ? 'Welcome Back' : 'Create an Account'}
            </h2>
            <p className="text-muted text-sm">
              {authModalMode === 'login' 
                ? 'Login to manage your properties and inquiries.'
                : 'Join GoSettle to find or list properties.'}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-50 text-red-500 text-sm font-medium rounded-lg text-center border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Role Selection for Registration */}
            {authModalMode === 'register' && (
              <div className="flex bg-page p-1.5 rounded-xl mb-5">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'PG_OWNER' })}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition-all duration-300 ${
                    formData.role === 'PG_OWNER' ? 'bg-white shadow-sm text-navy font-bold' : 'text-muted font-medium hover:text-navy'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  <span className="text-xs">PG Owner</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'RESTAURANT_OWNER' })}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition-all duration-300 ${
                    formData.role === 'RESTAURANT_OWNER' ? 'bg-white shadow-sm text-navy font-bold' : 'text-muted font-medium hover:text-navy'
                  }`}
                >
                  <UtensilsCrossed className="w-4 h-4" />
                  <span className="text-xs">Restaurant</span>
                </button>
              </div>
            )}

            {authModalMode === 'register' && (
              <div>
                <label className="block text-xs font-bold text-navy mb-1 uppercase tracking-wider">Full Name</label>
                <input required type="text" name="name" autoComplete="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 bg-page border border-border rounded-xl focus:border-accent outline-none transition-all duration-300 focus:bg-white focus:shadow-md" placeholder="e.g. Rahul Sharma" />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-navy mb-1 uppercase tracking-wider">Email Address</label>
              <input required type="email" name="email" autoComplete="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 bg-page border border-border rounded-xl focus:border-accent outline-none" placeholder="owner@example.com" />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-navy mb-1 uppercase tracking-wider transition-colors focus-within:text-accent">Password</label>
              <div className="relative">
                <input required type={showPassword ? "text" : "password"} name="password" autoComplete={authModalMode === 'login' ? 'current-password' : 'new-password'} value={formData.password} onChange={handleChange} className="w-full px-4 py-3 bg-page border border-border rounded-xl focus:border-accent focus:bg-white focus:shadow-md outline-none transition-all duration-300 pr-12" placeholder="••••••••" />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-navy transition-colors focus:outline-none p-1"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 mt-2 bg-accent text-white font-bold rounded-xl hover:bg-accent-hover transition-all duration-300 shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/40 hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:scale-100"
            >
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
              {authModalMode === 'login' ? 'Login' : 'Create Account'}
            </button>

            <div className="flex items-center gap-3 my-4">
              <hr className="flex-1 border-border" />
              <span className="text-xs font-bold text-muted uppercase">OR</span>
              <hr className="flex-1 border-border" />
            </div>

            <button
              type="button"
              onClick={() => alert("Google Login requires OAuth credentials to be set up on the backend.")}
              className="w-full py-3.5 bg-white border-2 border-border text-navy font-bold rounded-xl hover:bg-page hover:border-navy/20 transition-all duration-300 flex items-center justify-center gap-3 hover:-translate-y-0.5 active:scale-95 shadow-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

          </form>

          <div className="mt-6 text-center text-sm text-muted">
            {authModalMode === 'login' ? (
              <p>Don't have an account? <button onClick={() => setAuthModalMode('register')} className="font-bold text-accent hover:underline">Register here</button></p>
            ) : (
              <p>Already have an account? <button onClick={() => setAuthModalMode('login')} className="font-bold text-accent hover:underline">Login here</button></p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
