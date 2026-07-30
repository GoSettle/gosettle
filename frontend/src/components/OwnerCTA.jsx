import { useAuth } from '../context/AuthContext'
import useScrollReveal from '../hooks/useScrollReveal'

export default function OwnerCTA() {
  const revealRef = useScrollReveal()
  const { openAuthModal, owner } = useAuth()
  
  if (owner) return null; // Hide CTA if already logged in

  return (
    <section id="owner-cta" className="bg-navy-dark py-[72px] md:py-20">
      <div ref={revealRef} className="reveal max-w-container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-sora font-bold text-[28px] sm:text-[34px] text-white mb-4">
          Are you a PG owner or restaurant?
        </h2>
        <p className="font-dm text-base text-white/60 mb-10 max-w-xl mx-auto leading-relaxed">
          List for free. Reach thousands of students near your property. No commission, no middlemen.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={() => openAuthModal('register')}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-btn bg-accent text-white font-dm font-bold text-base hover:bg-accent-hover transition-all duration-300 shadow-xl shadow-accent/30 hover:shadow-accent/50 hover:-translate-y-1 transform hover:scale-[1.02] active:scale-95"
          >
            List My PG Free
          </button>
          <button
            onClick={() => openAuthModal('register')}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-btn border-2 border-white/30 text-white font-dm font-semibold text-base hover:bg-white hover:text-navy transition-all duration-300 hover:shadow-xl hover:-translate-y-1 transform hover:scale-[1.02] active:scale-95"
          >
            Add My Restaurant
          </button>
        </div>

        {/* Trust text */}
        <p className="font-dm text-sm text-white/40 flex items-center justify-center gap-3 flex-wrap">
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Free listing
          </span>
          <span className="text-white/20">·</span>
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            No commission
          </span>
          <span className="text-white/20">·</span>
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Direct inquiries
          </span>
        </p>
      </div>
    </section>
  )
}
