import useScrollReveal from '../hooks/useScrollReveal'
import heroBg from '../assets/hero-bg.jpg.png'

const StaggeredText = ({ text, delayOffset = 0 }) => (
  <span className="inline">
    {text.split('').map((char, index) => (
      <span
        key={index}
        className="inline-block animate-fadeInUp opacity-0"
        style={{ 
          animationDelay: `${delayOffset + (index * 0.04)}s`, 
          animationFillMode: 'forwards' 
        }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))}
  </span>
)

/* ── Inline SVG icons ─────────────────────────────── */
const CheckShield = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
)
const Utensils = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v6m0 0c-1.657 0-3 1.343-3 3v1h6v-1c0-1.657-1.343-3-3-3zm-3 10h6m-6 0v4a2 2 0 002 2h2a2 2 0 002-2v-4m-6 0h6" />
  </svg>
)
const Chat = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
)
const Users = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const trustBadges = [
  { icon: <CheckShield />, label: 'Verified Housing' },
  { icon: <Utensils />, label: 'Affordable Food' },
  { icon: <Chat />, label: 'Direct Chat' },
  { icon: <Users />, label: '3.5M+ Students' },
]

export default function Hero() {
  const revealRef = useScrollReveal()

  return (
    <section id="hero" className="relative pt-[72px] lg:min-h-[90vh] flex flex-col lg:block overflow-hidden bg-navy">
      
      {/* Background image - Covers entire section on all screens */}
      <div
        className="absolute inset-0 bg-cover bg-[center_10%] lg:bg-[right_center] bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-navy/60 lg:bg-transparent lg:bg-gradient-to-r from-navy via-navy/80 to-transparent" />

      {/* Content Container */}
      <div
        ref={revealRef}
        className="reveal relative z-10 max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-24 w-full flex-1 flex flex-col justify-center"
      >
        <div className="max-w-3xl">
          {/* Premium Glass Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-5 py-1.5 sm:py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md shadow-xl mb-6 sm:mb-8 transform transition hover:scale-105">
            <span className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-accent text-white text-[10px] sm:text-xs shrink-0">
              🏆
            </span>
            <span className="text-white text-[11px] sm:text-sm font-dm font-semibold tracking-wide leading-tight">
              India's #1 Student Relocation Platform
            </span>
          </div>

          {/* H1 - Massive and Crisp */}
          <h1 className="font-sora font-extrabold text-4xl sm:text-6xl lg:text-[76px] leading-[1.15] sm:leading-[1.05] tracking-tight text-white mb-5 sm:mb-7 drop-shadow-xl">
            <StaggeredText text="Move Cities." delayOffset={0.1} />
            <br />
            <span className="text-accent drop-shadow-2xl inline-block">
              <StaggeredText text="Not " delayOffset={0.6} />
              <span className="relative inline-block">
                <StaggeredText text="Problems." delayOffset={0.75} />
                <span 
                  className="absolute left-[-2%] top-[55%] h-[4px] sm:h-[6px] w-[105%] bg-red-500 -translate-y-1/2 rotate-[-3deg] rounded-full z-10 shadow-sm opacity-0 animate-strike" 
                  style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}
                ></span>
              </span>
            </span>
          </h1>

          {/* Subtext - Higher Contrast */}
          <p className="font-dm text-sm sm:text-xl text-white/90 max-w-xl mb-8 sm:mb-10 leading-relaxed font-light">
            Find verified PGs and affordable food near your college.
            <br className="hidden sm:block" />
            Chat with owners directly and <strong className="font-semibold text-white">settle in days — not weeks.</strong>
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-10">
            <a
              href="#search"
              className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-7 py-3.5 rounded-btn bg-accent text-white font-dm font-bold text-sm sm:text-base hover:bg-accent-hover transition-all duration-200 shadow-xl shadow-accent/30"
            >
              Find PG & Food
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a
              href="#how-it-works"
              className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-7 py-3.5 rounded-btn border-2 border-white/30 text-white font-dm font-semibold text-sm sm:text-base hover:bg-white/10 backdrop-blur-sm transition-all duration-200"
            >
              How It Works
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {trustBadges.map((badge) => (
              <span key={badge.label} className="inline-flex items-center gap-2 text-white/85 text-sm font-dm">
                <span className="text-accent">{badge.icon}</span>
                {badge.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
