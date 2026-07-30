import { useState, useEffect } from 'react'
import { MapPin, Filter, Star, ChevronRight } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import useSEO from '../hooks/useSEO'

import { API_BASE_URL } from '../config'

export default function SearchPage() {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  
  // Initial state from URL params if available
  const [activeTab, setActiveTab] = useState(searchParams.get('type') || 'pg')
  const [searchCity, setSearchCity] = useState(searchParams.get('city') || '')
  
  const [filteredListings, setFilteredListings] = useState([])
  const [loading, setLoading] = useState(true)

  useSEO({
    title: searchCity ? `PGs and Food in ${searchCity}` : 'Search PGs and Food',
    description: `Browse verified student housing, PGs, hostels, and tiffin services ${searchCity ? `in ${searchCity}` : 'near your college'}. Filter by budget, gender, and amenities.`,
    keywords: `PG in ${searchCity || 'India'}, hostel in ${searchCity || 'India'}, tiffin delivery, student accommodation`
  })

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true)
      try {
        let url = `${API_BASE_URL}/api/properties?`;
        if (activeTab && activeTab !== 'both') url += `type=${activeTab}&`;
        if (searchCity) url += `city=${searchCity}&`;

        const res = await fetch(url)
        if (res.ok) {
          const data = await res.json()
          setFilteredListings(data)
        }
      } catch (err) {
        console.error('Failed to fetch properties:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchProperties()
  }, [activeTab, searchCity])

  return (
    <div className="min-h-screen bg-page font-dm text-body flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-[72px] animate-fadeIn">
        {/* Search Header */}
        <div className="bg-white border-b border-border py-8">
          <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="font-sora font-bold text-3xl text-navy mb-4">
              {searchCity ? `Properties in ${searchCity}` : 'Explore All Properties'}
            </h1>
            
            {/* Quick Filters */}
            <div className="flex flex-wrap gap-3">
              <button 
                onClick={() => setActiveTab('pg')}
                className={`px-5 py-2 rounded-full font-medium text-sm transition-all duration-300 transform hover:scale-105 active:scale-95 ${activeTab === 'pg' ? 'bg-navy text-white shadow-md' : 'bg-page text-muted hover:bg-gray-200'}`}
              >
                PGs & Hostels
              </button>
              <button 
                onClick={() => setActiveTab('restaurant')}
                className={`px-5 py-2 rounded-full font-medium text-sm transition-all duration-300 transform hover:scale-105 active:scale-95 ${activeTab === 'restaurant' ? 'bg-navy text-white shadow-md' : 'bg-page text-muted hover:bg-gray-200'}`}
              >
                Tiffins & Mess
              </button>
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 shrink-0">
            <div className="bg-white p-5 rounded-2xl border border-border sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="w-5 h-5 text-accent" />
                <h3 className="font-sora font-bold text-lg text-navy">Filters</h3>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-bold text-navy mb-3">Price Range</label>
                <input type="range" className="w-full accent-accent" min="3000" max="25000" />
                <div className="flex justify-between text-xs text-muted mt-2">
                  <span>₹3,000</span>
                  <span>₹25,000+</span>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-bold text-navy mb-3">Gender</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded text-accent focus:ring-accent" />
                    <span className="text-sm">Boys</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded text-accent focus:ring-accent" />
                    <span className="text-sm">Girls</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded text-accent focus:ring-accent" />
                    <span className="text-sm">Co-ed</span>
                  </label>
                </div>
              </div>

              <button className="w-full py-2.5 bg-page text-navy font-bold rounded-lg hover:bg-navy hover:text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-sm">
                Reset Filters
              </button>
            </div>
          </aside>

          {/* Listings Grid */}
          <div className="flex-grow">
            <div className="mb-4 flex justify-between items-center">
              <p className="text-muted font-medium">{loading ? 'Loading...' : `${filteredListings.length} results found`}</p>
              <select className="bg-white border border-border rounded-lg px-3 py-1.5 text-sm font-medium outline-none focus:border-accent">
                <option>Sort by: Recommended</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Highest Rated</option>
              </select>
            </div>

            {loading && (
              <div className="text-center py-20 bg-white rounded-2xl border border-border mb-6">
                <p className="font-sora font-bold text-xl text-navy mb-2">Loading properties...</p>
              </div>
            )}

            {!loading && <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredListings.map((listing, index) => (
                <Link 
                  to={`/property/${listing.id}`} 
                  key={listing.id} 
                  className="group flex flex-col bg-white rounded-2xl border border-border overflow-hidden hover:shadow-[0_15px_35px_-10px_rgba(34,50,84,0.15)] hover:-translate-y-2 transition-all duration-500 animate-fadeInUp opacity-0"
                  style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1 font-bold text-sm text-navy shadow-sm">
                      <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                      {listing.rating}
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-sora font-bold text-lg text-navy line-clamp-1">{listing.title}</h3>
                    </div>
                    <div className="flex items-center gap-1 text-muted text-sm mb-4">
                      <MapPin className="w-4 h-4" />
                      <span className="line-clamp-1">Near {listing.college}, {listing.city}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {listing.amenities.slice(0, 3).map(amenity => (
                        <span key={amenity} className="px-2 py-1 bg-page text-muted text-xs font-medium rounded-md">
                          {amenity}
                        </span>
                      ))}
                      {listing.amenities.length > 3 && (
                        <span className="px-2 py-1 bg-page text-muted text-xs font-medium rounded-md">+{listing.amenities.length - 3}</span>
                      )}
                    </div>

                    <div className="mt-auto pt-4 border-t border-border flex justify-between items-center">
                      <div>
                        <p className="text-xs text-muted font-medium mb-0.5">Starts from</p>
                        <p className="font-sora font-bold text-lg text-navy">₹{listing.price}<span className="text-sm font-normal text-muted">/mo</span></p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-page flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>}
            
            {!loading && filteredListings.length === 0 && (
              <div className="text-center py-20 bg-white rounded-2xl border border-border">
                <p className="font-sora font-bold text-xl text-navy mb-2">No properties found</p>
                <p className="text-muted">Try adjusting your filters or search for a different city.</p>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  )
}
