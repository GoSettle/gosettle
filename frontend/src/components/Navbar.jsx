import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import logoImg from '../assets/logo.png.png'

const navLinks = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Find PG', href: '#listings' },
  { label: 'Find Food', href: '#listings' },
  { label: 'For Owners', href: '#owner-cta' },
  { label: 'Reviews', href: '#testimonials' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const { owner, logout, openAuthModal } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 border-b border-border transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-md' : 'bg-white'
        }`}
    >
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-[72px]">
        {/* Logo */}
        <Link to="/" className="shrink-0 relative flex items-center w-[200px] h-full overflow-hidden group">
          <img
            src={logoImg}
            alt="GoSettle"
            className="absolute top-1/2 left-[-10px] -translate-y-1/2 h-[90px] w-auto max-w-none object-contain mix-blend-multiply group-hover:scale-[1.03] transition-transform duration-300"
          />
        </Link>

        {/* Center nav links — desktop */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="relative font-dm text-sm font-bold text-body hover:text-accent transition-colors duration-300 group"
              >
                {link.label}
                <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full rounded-full"></span>
              </a>
            </li>
          ))}
        </ul>

        {/* Right buttons — desktop */}
        <div className="hidden lg:flex items-center gap-3">
          {owner ? (
            <div className="relative">
              <button 
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 cursor-pointer hover:bg-page px-3 py-2 rounded-xl transition-colors border border-transparent hover:border-border"
              >
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold">
                  {owner.name.charAt(0).toUpperCase()}
                </div>
                <span className="font-dm font-semibold text-sm text-navy">Hi, {owner.name.split(' ')[0]}</span>
                <svg className={`w-4 h-4 text-muted transition-transform duration-300 ${profileDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {profileDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setProfileDropdownOpen(false)}></div>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-border py-2 z-50 animate-fadeIn origin-top-right">
                    {owner.role !== 'USER' && (
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          navigate(owner.role === 'PG_OWNER' ? '/dashboard/pg' : '/dashboard/restaurant');
                        }}
                        className="w-full text-left px-5 py-2.5 text-sm font-dm font-semibold text-navy hover:bg-page hover:text-accent transition-colors flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                        Dashboard
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        logout();
                        navigate('/');
                      }}
                      className="w-full text-left px-5 py-2.5 text-sm font-dm font-semibold text-red-500 hover:bg-red-50 transition-colors flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <>
              <button
                onClick={() => openAuthModal('login')}
                className="px-5 py-2.5 rounded-btn bg-accent text-white font-dm font-semibold text-sm hover:bg-accent-hover hover:shadow-xl hover:shadow-accent/40 hover:-translate-y-0.5 transition-all duration-300 shadow-md shadow-accent/20"
              >
                Login / Sign Up
              </button>
            </>
          )}
        </div>

        {/* Hamburger — mobile */}
        <button
          className={`lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 ${menuOpen ? 'hamburger-open' : ''
            }`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="hamburger-line block w-6 h-0.5 bg-navy rounded-full" />
          <span className="hamburger-line block w-6 h-0.5 bg-navy rounded-full" />
          <span className="hamburger-line block w-6 h-0.5 bg-navy rounded-full" />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 bg-white border-t border-border ${menuOpen ? 'max-h-[500px] py-4' : 'max-h-0'
          }`}
      >
        <div className="max-w-container mx-auto px-4 sm:px-6 flex flex-col gap-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-dm text-base font-medium text-body hover:text-accent py-2 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <hr className="border-border" />
          {owner ? (
            <>
              <div className="flex items-center justify-center gap-2 py-2">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold">
                  {owner.name.charAt(0).toUpperCase()}
                </div>
                <span className="font-dm font-semibold text-sm text-navy">Hi, {owner.name.split(' ')[0]}</span>
              </div>
              {owner.role !== 'USER' && (
                <button
                  className="px-5 py-2.5 rounded-btn border-2 border-navy text-navy font-dm font-semibold text-sm text-center hover:bg-navy hover:text-white transition-all"
                  onClick={() => { setMenuOpen(false); navigate(owner.role === 'PG_OWNER' ? '/dashboard/pg' : '/dashboard/restaurant'); }}
                >
                  Dashboard
                </button>
              )}
              <button
                className="px-5 py-2.5 rounded-btn bg-red-50 text-red-500 font-dm font-semibold text-sm text-center hover:bg-red-100 transition-all"
                onClick={() => { 
                  setMenuOpen(false); 
                  logout(); 
                  navigate('/'); 
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                className="px-5 py-2.5 rounded-btn bg-accent text-white font-dm font-semibold text-sm text-center hover:bg-accent-hover transition-all"
                onClick={() => { setMenuOpen(false); openAuthModal('login'); }}
              >
                Login / Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
