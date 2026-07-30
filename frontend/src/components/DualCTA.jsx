import useScrollReveal from '../hooks/useScrollReveal'

export default function DualCTA() {
  const revealRef = useScrollReveal()

  return (
    <section id="dual-cta" ref={revealRef} className="reveal">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* ── Left Panel — Navy ─────────────────── */}
        <div className="bg-navy px-6 sm:px-10 lg:px-16 py-16 md:py-20 flex flex-col items-start justify-center">
          <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
          </div>
          <h3 className="font-sora font-bold text-2xl sm:text-[28px] text-white mb-3">
            Find your PG today
          </h3>
          <p className="font-dm text-base text-white/65 mb-8 max-w-md leading-relaxed">
            Browse 1,000+ verified PGs near your college. Compare prices, read reviews, and book directly.
          </p>
          <a
            href="#search"
            className="group/btn inline-flex items-center gap-2 px-7 py-3.5 rounded-btn bg-white text-navy font-dm font-bold text-sm hover:bg-page hover:shadow-xl hover:shadow-white/20 hover:-translate-y-1 transition-all duration-300 shadow-lg"
          >
            Search PGs
            <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>

        {/* ── Right Panel — Orange ──────────────── */}
        <div className="bg-accent px-6 sm:px-10 lg:px-16 py-16 md:py-20 flex flex-col items-start justify-center">
          <div className="w-14 h-14 rounded-xl bg-navy/15 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <svg className="w-7 h-7 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.126-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265zm-3 0a.375.375 0 11-.53 0L9 2.845l.265.265zm6 0a.375.375 0 11-.53 0L15 2.845l.265.265z" />
            </svg>
          </div>
          <h3 className="font-sora font-bold text-2xl sm:text-[28px] text-navy mb-3">
            Discover food near you
          </h3>
          <p className="font-dm text-base text-navy/65 mb-8 max-w-md leading-relaxed">
            Mess, tiffin, canteen — find affordable food options near your campus. Subscribe monthly.
          </p>
          <a
            href="#search"
            className="group/btn inline-flex items-center gap-2 px-7 py-3.5 rounded-btn bg-navy text-white font-dm font-bold text-sm hover:bg-navy-dark hover:shadow-xl hover:shadow-navy/30 hover:-translate-y-1 transition-all duration-300 shadow-lg"
          >
            Find Food
            <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
