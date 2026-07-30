import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { MapPin, Star, Share2, Heart, CheckCircle2, Phone, ArrowLeft, ShieldCheck, Clock } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import InquiryModal from '../components/InquiryModal'
import useSEO from '../hooks/useSEO'

import { API_BASE_URL } from '../config'

export default function PropertyDetailsPage() {
  const { id } = useParams()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false)

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/properties/${id}`)
        if (res.ok) {
          const data = await res.json()
          setProperty(data)
        }
      } catch (err) {
        console.error('Failed to fetch property:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchProperty()
  }, [id])

  useSEO({
    title: property ? `${property.title} in ${property.city}` : 'Loading Property...',
    description: property ? property.description.substring(0, 155) + '...' : 'Loading listing details.',
    keywords: property ? `${property.type}, ${property.city}, student housing, ${property.college} PG` : ''
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-page font-dm text-body flex flex-col">
        <Navbar />
        <main className="flex-grow pt-[72px] flex items-center justify-center">
          <p className="font-bold text-navy text-xl">Loading Property...</p>
        </main>
        <Footer />
      </div>
    )
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-page font-dm text-body flex flex-col">
        <Navbar />
        <main className="flex-grow pt-[72px] flex items-center justify-center">
          <div className="text-center">
            <h2 className="font-sora font-bold text-2xl text-navy mb-2">Property Not Found</h2>
            <p className="text-muted mb-6">The listing you are looking for does not exist or has been removed.</p>
            <Link to="/search" className="px-6 py-3 bg-navy text-white rounded-lg font-bold hover:bg-navy-dark">
              Back to Search
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-page font-dm text-body flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-[72px] pb-20 animate-fadeIn">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          
          {/* Breadcrumb & Actions */}
          <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
            <Link to="/search" className="group flex items-center gap-2 text-muted hover:text-navy transition-colors font-medium text-sm">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" /> Back to search
            </Link>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-lg text-sm font-bold text-navy hover:bg-gray-50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 shadow-sm">
                <Share2 className="w-4 h-4" /> Share
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-lg text-sm font-bold text-navy hover:bg-red-50 hover:border-red-100 hover:text-red-500 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 shadow-sm group">
                <Heart className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform duration-300" /> Save
              </button>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 h-[300px] md:h-[400px] lg:h-[500px] rounded-3xl overflow-hidden group/gallery">
            <div className="w-full h-full bg-gray-200 overflow-hidden cursor-pointer">
              <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover group-hover/gallery:scale-105 transition-transform duration-700 ease-in-out" />
            </div>
            <div className="hidden md:grid grid-rows-2 gap-4 h-full">
              <div className="w-full h-full bg-gray-200 rounded-tr-3xl overflow-hidden cursor-pointer group/img2">
                <img src={property.images[1] || property.images[0]} alt={`${property.title} 2`} className="w-full h-full object-cover group-hover/img2:scale-110 transition-transform duration-500" />
              </div>
              <div className="relative w-full h-full bg-gray-200 rounded-br-3xl overflow-hidden cursor-pointer group/img3">
                <img src={property.images[0]} alt={`${property.title} 3`} className="w-full h-full object-cover filter brightness-75 group-hover/img3:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 flex items-center justify-center hover:bg-black/20 transition-colors duration-300">
                  <span className="text-white font-sora font-bold text-lg border-2 border-white px-6 py-2 rounded-full backdrop-blur-sm hover:bg-white hover:text-navy transition-colors duration-300">View All Photos</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-10">
            {/* Left Content */}
            <div className="flex-grow lg:w-2/3">
              
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-accent/10 text-accent font-bold text-xs uppercase tracking-wider rounded-md">
                  {property.type === 'pg' ? 'PG / Hostel' : 'Restaurant / Mess'}
                </span>
                {property.gender && (
                  <span className="px-3 py-1 bg-navy/5 text-navy font-bold text-xs uppercase tracking-wider rounded-md">
                    {property.gender}
                  </span>
                )}
              </div>

              <h1 className="font-sora font-bold text-3xl md:text-4xl text-navy mb-4 leading-tight">
                {property.title}
              </h1>

              <div className="flex items-center gap-4 text-muted mb-8 pb-8 border-b border-border text-sm">
                <div className="flex items-center gap-1.5 font-medium">
                  <MapPin className="w-4 h-4 text-accent" />
                  Near {property.college}, {property.city}
                </div>
                <span className="text-border">|</span>
                <div className="flex items-center gap-1.5 font-bold text-navy">
                  <Star className="w-4 h-4 text-accent fill-accent" />
                  {property.rating} <span className="text-muted font-normal underline cursor-pointer">({property.reviews} reviews)</span>
                </div>
              </div>

              {/* Description */}
              <section className="mb-10">
                <h3 className="font-sora font-bold text-xl text-navy mb-4">About this property</h3>
                <p className="text-muted leading-relaxed text-[15px]">
                  {property.description}
                </p>
              </section>

              {/* Amenities */}
              <section className="mb-10">
                <h3 className="font-sora font-bold text-xl text-navy mb-4">What this place offers</h3>
                <div className="grid grid-cols-2 gap-4">
                  {property.amenities.map(amenity => (
                    <div key={amenity} className="flex items-center gap-3 text-navy font-medium">
                      <CheckCircle2 className="w-5 h-5 text-success" />
                      {amenity}
                    </div>
                  ))}
                </div>
              </section>

              {/* Rules / Verification */}
              <section className="bg-white p-6 rounded-2xl border border-border flex items-start gap-4">
                <ShieldCheck className="w-8 h-8 text-accent shrink-0" />
                <div>
                  <h4 className="font-bold text-navy mb-1">GoSettle Verified Property</h4>
                  <p className="text-sm text-muted">This property has been physically verified by our team. The photos and amenities listed are 100% accurate. Book with confidence.</p>
                </div>
              </section>

            </div>

            {/* Right Sidebar (Pricing & Contact) */}
            <div className="w-full lg:w-1/3">
              <div className="bg-white rounded-3xl border border-border shadow-2xl shadow-navy/5 p-6 md:p-8 sticky top-24">
                <div className="mb-6">
                  <p className="text-sm text-muted font-bold uppercase tracking-wider mb-1">Starts from</p>
                  <p className="font-sora font-bold text-3xl text-navy">₹{property.price}<span className="text-base font-normal text-muted">/month</span></p>
                </div>

                <div className="bg-page rounded-2xl p-4 mb-6">
                  <h4 className="font-bold text-navy mb-3 text-sm">Pricing Options</h4>
                  <div className="space-y-3">
                    {(property.sharingOptions || []).map((opt, i) => (
                      <div key={i} className="flex justify-between items-center text-sm">
                        <span className="text-muted font-medium">{opt.type}</span>
                        <span className="font-bold text-navy">₹{opt.price}/mo</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <button onClick={() => setIsInquiryModalOpen(true)} className="w-full py-4 bg-accent text-white font-bold rounded-xl hover:bg-accent-hover transition-all duration-300 shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/40 hover:-translate-y-1 flex justify-center items-center gap-2 group">
                    <Phone className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                    Contact Owner
                  </button>
                  <button onClick={() => setIsInquiryModalOpen(true)} className="w-full py-4 bg-white border-2 border-navy text-navy font-bold rounded-xl hover:bg-navy hover:text-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    Schedule a Visit
                  </button>
                </div>

                <div className="mt-6 pt-6 border-t border-border flex items-center gap-4">
                  <div className="w-12 h-12 bg-navy rounded-full flex items-center justify-center text-white font-sora font-bold text-xl">
                    {property.owner.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-navy text-sm">Listed by {property.owner.name}</p>
                    <p className="text-xs text-muted">Joined GoSettle in {new Date(property.owner.joinedAt).getFullYear()}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
      {property && (
        <InquiryModal 
          isOpen={isInquiryModalOpen} 
          onClose={() => setIsInquiryModalOpen(false)} 
          propertyId={property.id} 
          propertyTitle={property.title} 
        />
      )}
    </div>
  )
}
