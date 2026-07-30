import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useScrollReveal from '../hooks/useScrollReveal'

import { API_BASE_URL } from '../config'

const filterTabs = ['All', 'PG', 'RESTAURANT']

const Star = ({ filled }) => (
  <svg className={`w-3.5 h-3.5 ${filled ? 'text-accent' : 'text-border'}`} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)

export default function FeaturedListings() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const revealRef = useScrollReveal()

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/properties`)
        if (res.ok) {
          const data = await res.json()
          setListings(data.slice(0, 6)) // featured
        }
      } catch (err) {
        console.error('Error fetching properties:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchListings()
  }, [])

  const filtered = activeFilter === 'All'
    ? listings
    : listings.filter((l) => l.type === activeFilter)

  return (
    <section id="listings" className="relative bg-gradient-to-b from-page to-white py-[72px] md:py-24 overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
      
      <div ref={revealRef} className="reveal relative z-10 max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block px-5 py-2 rounded-full bg-accent text-white shadow-md shadow-accent/20 text-sm font-dm font-bold tracking-wide mb-6 uppercase">
            Top Picks For You
          </span>
          <h2 className="font-sora font-extrabold text-[36px] sm:text-[48px] leading-tight mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy to-navy/70">PGs & Food Near </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-hover drop-shadow-sm">Popular Colleges</span>
          </h2>
          <p className="text-muted font-dm text-base sm:text-lg max-w-2xl mx-auto">
            Discover verified, top-rated stays and home-cooked meals tailored specifically for students.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex justify-center mb-10">
          <div className="flex flex-wrap justify-center gap-2">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-6 py-2.5 rounded-full font-dm font-bold text-sm transition-all duration-300 border-2 ${
                  activeFilter === tab
                    ? 'bg-navy text-white border-navy shadow-lg shadow-navy/20 scale-105'
                    : 'bg-white text-muted border-border hover:border-navy hover:text-navy hover:bg-page hover:scale-105'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Cards grid */}
        {loading ? (
          <div className="text-center py-10">
            <p className="text-navy font-bold">Loading featured properties...</p>
          </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((listing, index) => (
            <div
              key={listing.id}
              className="bg-white rounded-3xl border border-border/60 overflow-hidden group hover:shadow-[0_20px_40px_-15px_rgba(34,50,84,0.15)] hover:-translate-y-2 transition-all duration-500 flex flex-col"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Photo area with real image */}
              <div className="h-56 relative overflow-hidden bg-gray-200">
                <img 
                  src={listing.images?.[0] || 'https://via.placeholder.com/800'} 
                  alt={listing.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />

                {/* Gradient overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Verified badge */}
                <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-navy text-xs font-dm font-bold px-3 py-1.5 rounded-md flex items-center gap-1.5 shadow-sm">
                  <svg className="w-3.5 h-3.5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Verified
                </span>
              </div>

              {/* Card body */}
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-sora font-bold text-lg text-navy">{listing.title}</h3>
                </div>
                
                <p className="font-dm text-sm text-muted mb-4 flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {listing.college}, {listing.city}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {(listing.amenities || []).slice(0,3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-page text-muted text-xs font-dm font-medium border border-border/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-4 border-t border-border flex flex-col gap-5">
                  {/* Price + rating */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-muted block mb-0.5 font-medium">Starts from</span>
                      <span className="font-sora font-bold text-[22px] text-navy">
                        ₹{listing.price?.toLocaleString()}
                        <span className="text-muted font-dm text-sm font-normal">/mo</span>
                      </span>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} filled={s <= listing.rating} />
                        ))}
                      </div>
                      <span className="text-xs text-muted font-medium underline">{listing.reviews} Reviews</span>
                    </div>
                  </div>

                  {/* Action Buttons - Distinct Hierarchy */}
                  <div className="flex gap-3">
                    <Link to={`/property/${listing.id}`} className="flex-1 py-3 rounded-xl bg-accent text-white font-dm font-bold text-sm text-center hover:bg-accent-hover transition-colors shadow-md shadow-accent/20">
                      View Details
                    </Link>
                    <button className="flex-1 py-3 rounded-xl border-2 border-navy bg-transparent text-navy font-dm font-bold text-sm hover:bg-navy/5 transition-colors">
                      Call Owner
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        )}

        {/* View all button */}
        <div className="text-center mt-14 relative z-10">
          <Link to="/search" className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-navy text-white font-dm font-bold text-base hover:bg-navy-dark hover:shadow-xl hover:shadow-navy/30 hover:-translate-y-1 transition-all duration-300">
            Explore All Properties
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
