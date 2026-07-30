import useScrollReveal from '../hooks/useScrollReveal'

const testimonials = [
  {
    id: 1,
    name: 'Arjun Kumar',
    college: 'VTU Bangalore',
    initials: 'AK',
    quote: 'Found a verified PG in 2 days. Direct chat saved so much time — no middlemen!',
    rating: 5,
  },
  {
    id: 2,
    name: 'Priya Sharma',
    college: 'IIT Bombay',
    initials: 'PS',
    quote: 'Tiffin subscription at ₹2,800/month. Found it the same day I searched!',
    rating: 5,
  },
  {
    id: 3,
    name: 'Ramesh Verma',
    college: 'PG Owner · Hyderabad',
    initials: 'RV',
    quote: 'Got 15 inquiries in first week. Room filled in 3 days. GoSettle is incredible!',
    rating: 5,
  },
]

export default function Testimonials() {
  const revealRef = useScrollReveal()

  return (
    <section id="testimonials" className="bg-white py-[72px] md:py-20">
      <div ref={revealRef} className="reveal max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-dm font-semibold mb-4">
            Testimonials
          </span>
          <h2 className="font-sora font-bold text-[28px] sm:text-[32px] text-navy">
            Students love GoSettle
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-page rounded-card p-6 border border-border hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-accent group-hover:scale-110 transition-transform duration-300" style={{ transitionDelay: `${i * 50}ms` }} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="font-dm text-sm text-body italic leading-relaxed mb-6 line-clamp-3">
                "{t.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center shrink-0">
                  <span className="font-sora font-bold text-sm text-white">{t.initials}</span>
                </div>
                <div>
                  <p className="font-dm font-semibold text-sm text-body">{t.name}</p>
                  <p className="font-dm text-xs text-muted">{t.college}</p>
                </div>
              </div>

              {/* Verified badge */}
              <div className="mt-4 pt-4 border-t border-border">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-success/10 text-success text-xs font-dm font-semibold">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Verified Student
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
