import useScrollReveal from '../hooks/useScrollReveal'
import logoImg from '../assets/logo.png.png'

const platformLinks = [
  { label: 'Find PG', href: '#listings' },
  { label: 'Find Food', href: '#listings' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#' },
]

const ownerLinks = [
  { label: 'List PG', href: '#owner-cta' },
  { label: 'Add Restaurant', href: '#owner-cta' },
  { label: 'Dashboard', href: '#' },
  { label: 'Support', href: '#' },
]

const cityLinks = ['Bangalore', 'Pune', 'Hyderabad', 'Chennai', 'Delhi', 'Mumbai']

/* Social icons */
const Instagram = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
)

const LinkedIn = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const Twitter = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const YouTube = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
)

export default function Footer() {
  const revealRef = useScrollReveal()

  return (
    <footer id="footer" className="bg-navy-darker">
      <div ref={revealRef} className="reveal max-w-container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Top row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1 — Brand */}
          <div>
            <a href="#" className="relative flex items-center justify-center w-[180px] h-[60px] bg-white rounded-xl mb-5 overflow-hidden">
              <img
                src={logoImg}
                alt="GoSettle"
                className="h-[90px] w-auto max-w-none object-contain"
              />
            </a>
            <p className="font-dm text-sm text-white/50 leading-relaxed mb-5">
              Move Cities. Not Problems.
              <br />
              Find your home. Fix your food.
              <br />
              Settle in days — not weeks.
            </p>
            <div className="flex gap-3">
              {[
                { icon: <Instagram />, label: 'Instagram' },
                { icon: <LinkedIn />, label: 'LinkedIn' },
                { icon: <Twitter />, label: 'Twitter' },
                { icon: <YouTube />, label: 'YouTube' },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-accent hover:-translate-y-1 hover:rotate-6 hover:shadow-lg hover:shadow-accent/40 transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Platform */}
          <div>
            <h4 className="font-sora font-bold text-sm text-white uppercase tracking-wider mb-5">
              Platform
            </h4>
            <ul className="space-y-3">
              {platformLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="inline-block font-dm text-sm text-white/50 hover:text-accent hover:translate-x-1 transition-all duration-300">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — For Owners */}
          <div>
            <h4 className="font-sora font-bold text-sm text-white uppercase tracking-wider mb-5">
              For Owners
            </h4>
            <ul className="space-y-3">
              {ownerLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="inline-block font-dm text-sm text-white/50 hover:text-accent hover:translate-x-1 transition-all duration-300">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Cities */}
          <div>
            <h4 className="font-sora font-bold text-sm text-white uppercase tracking-wider mb-5">
              Cities
            </h4>
            <ul className="space-y-3">
              {cityLinks.map((city) => (
                <li key={city}>
                  <a href="#" className="inline-block font-dm text-sm text-white/50 hover:text-accent hover:translate-x-1 transition-all duration-300">
                    {city}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-dm text-sm text-white/35">
            © 2026 GoSettle. All rights reserved.
          </p>
          <p className="font-dm text-sm text-white/35">
            Made with <span className="text-red-400">❤️</span> for Indian students
          </p>
        </div>
      </div>
    </footer>
  )
}
