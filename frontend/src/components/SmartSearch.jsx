import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useScrollReveal from '../hooks/useScrollReveal'

const cities = ['Bangalore', 'Pune', 'Hyderabad', 'Chennai', 'Delhi', 'Mumbai']

// Alternate names that Nominatim might return → our canonical city name
const cityAliases = {
  'bengaluru': 'Bangalore',
  'bangalore': 'Bangalore',
  'pune': 'Pune',
  'hyderabad': 'Hyderabad',
  'chennai': 'Chennai',
  'delhi': 'Delhi',
  'new delhi': 'Delhi',
  'mumbai': 'Mumbai',
}

const colleges = {
  Bangalore: ['VTU Campus', 'Christ University', 'RV College', 'PES University'],
  Pune: ['Pune University', 'MIT Pune', 'Symbiosis', 'COEP'],
  Hyderabad: ['BITS Hyderabad', 'IIIT Hyderabad', 'Osmania University', 'JNTU'],
  Chennai: ['IIT Madras', 'Anna University', 'SRM University', 'VIT Chennai'],
  Delhi: ['Delhi University', 'JNU', 'IIT Delhi', 'Jamia Millia'],
  Mumbai: ['IIT Bombay', 'Mumbai University', 'NMIMS', 'VJTI'],
}

const popularCities = ['Bangalore', 'Pune', 'Hyderabad', 'Chennai', 'Delhi', 'Mumbai']

/* -- Premium UI Icons -- */
const MapPin = () => (
  <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const AcademicCap = () => (
  <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path d="M12 14l9-5-9-5-9 5 9 5z" />
    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
  </svg>
)

const Wallet = () => (
  <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
)

const ChevronDown = () => (
  <svg className="w-5 h-5 text-navy absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
)

const Crosshair = ({ className = '' }) => (
  <svg className={`w-4 h-4 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <circle cx="12" cy="12" r="3" />
    <path strokeLinecap="round" d="M12 2v4m0 12v4m10-10h-4M6 12H2" />
  </svg>
)

const Spinner = () => (
  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
)

export default function SmartSearch() {
  const revealRef = useScrollReveal()
  const navigate = useNavigate()
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedCollege, setSelectedCollege] = useState('')
  const [searchType, setSearchType] = useState('Both')
  const [budget, setBudget] = useState('')
  const [locationLoading, setLocationLoading] = useState(false)
  const [locationError, setLocationError] = useState('')
  const [detectedCityName, setDetectedCityName] = useState('')

  const detectCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser')
      return
    }

    setLocationLoading(true)
    setLocationError('')
    setDetectedCityName('')

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`,
            { headers: { 'Accept-Language': 'en' } }
          )
          const data = await res.json()
          const addr = data.address || {}
          // Nominatim returns city in various fields depending on location
          const rawCity = (addr.city || addr.town || addr.village || addr.state_district || addr.county || '').toLowerCase()

          const matched = cityAliases[rawCity]
          if (matched) {
            setSelectedCity(matched)
            setSelectedCollege('')
            setDetectedCityName(matched)
            setLocationError('')
          } else {
            setLocationError(`We detected "${addr.city || addr.town || addr.state || 'Unknown'}" — not yet available on GoSettle`)
          }
        } catch {
          setLocationError('Could not determine your city. Please select manually.')
        } finally {
          setLocationLoading(false)
        }
      },
      (err) => {
        setLocationLoading(false)
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setLocationError('Location access denied. Please allow location in your browser settings.')
            break
          case err.POSITION_UNAVAILABLE:
            setLocationError('Location information unavailable.')
            break
          case err.TIMEOUT:
            setLocationError('Location request timed out. Try again.')
            break
          default:
            setLocationError('An unknown error occurred.')
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
    )
  }

  return (
    <section id="search" className="bg-page py-16 md:py-24 relative z-20">
      <div ref={revealRef} className="reveal max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Tabs for Search Type */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex bg-white p-1.5 rounded-2xl shadow-sm border border-border">
            {['PG', 'Food', 'Both'].map((t) => (
              <button
                key={t}
                onClick={() => setSearchType(t)}
                className={`px-8 py-3 rounded-xl text-sm font-dm font-bold transition-all duration-300 ${
                  searchType === t
                    ? 'bg-navy text-white shadow-lg transform scale-[1.02]'
                    : 'text-muted hover:text-navy hover:bg-page'
                }`}
              >
                {t === 'PG' ? 'PG Only' : t === 'Food' ? 'Food Only' : 'PG & Food'}
              </button>
            ))}
          </div>
        </div>

        {/* Search bar Container */}
        <div className="bg-white rounded-[2rem] shadow-2xl shadow-navy/5 border border-border p-4 sm:p-6">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
            
            {/* City */}
            <div className="flex-1 px-4 py-3 bg-white rounded-xl border-2 border-border/80 focus-within:border-accent hover:border-accent/40 transition-colors group">
              <label className="flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-muted font-sora font-bold mb-2">
                <MapPin /> City
              </label>
              <div className="relative">
                <select
                  value={selectedCity}
                  onChange={(e) => { setSelectedCity(e.target.value); setSelectedCollege(''); setDetectedCityName(''); setLocationError('') }}
                  className="w-full bg-transparent text-navy font-dm font-bold text-base sm:text-lg outline-none cursor-pointer appearance-none pr-8"
                >
                  <option value="" disabled className="text-muted">Select your city</option>
                  {cities.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                <ChevronDown />
              </div>
              {/* Use Current Location Button */}
              <button
                type="button"
                onClick={detectCurrentLocation}
                disabled={locationLoading}
                className={`mt-2 flex items-center gap-2 text-xs font-bold transition-all duration-200 rounded-full px-3 py-1.5 ${
                  detectedCityName
                    ? 'bg-green-50 text-green-600 border border-green-200'
                    : locationError
                    ? 'bg-red-50 text-red-500 border border-red-200 hover:bg-red-100'
                    : 'bg-accent/5 text-accent border border-accent/20 hover:bg-accent/10 hover:border-accent/40'
                }`}
              >
                {locationLoading ? (
                  <><Spinner /> Detecting location…</>
                ) : detectedCityName ? (
                  <>
                    <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Located in {detectedCityName}
                  </>
                ) : (
                  <><Crosshair className="text-accent" /> Use current location</>
                )}
              </button>
              {locationError && (
                <p className="mt-1.5 text-[11px] text-red-400 font-medium leading-tight">{locationError}</p>
              )}
            </div>

            {/* College/Area */}
            <div className="flex-1 px-4 py-3 bg-white rounded-xl border-2 border-border/80 focus-within:border-accent hover:border-accent/40 transition-colors group">
              <label className="flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-muted font-sora font-bold mb-2">
                <AcademicCap /> {searchType === 'PG' ? 'College' : 'College / Area'}
              </label>
              <div className="relative">
                <select
                  value={selectedCollege}
                  onChange={(e) => setSelectedCollege(e.target.value)}
                  className="w-full bg-transparent text-navy font-dm font-bold text-base sm:text-lg outline-none cursor-pointer appearance-none pr-8 disabled:opacity-50"
                  disabled={!selectedCity}
                >
                  <option value="" disabled>{selectedCity ? (searchType === 'PG' ? 'Select college' : 'Select area') : 'Pick a city first'}</option>
                  {(colleges[selectedCity] || []).map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                <ChevronDown />
              </div>
            </div>

            {/* Budget */}
            <div className="flex-1 px-4 py-3 bg-white rounded-xl border-2 border-border/80 focus-within:border-accent hover:border-accent/40 transition-colors group">
              <label className="flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-muted font-sora font-bold mb-2">
                <Wallet /> {searchType === 'PG' ? 'Max Rent' : searchType === 'Food' ? 'Meal Budget' : 'Total Budget'}
              </label>
              <div className="relative flex items-center">
                <span className="text-muted font-dm font-bold text-lg mr-1">₹</span>
                <input
                  type="number"
                  placeholder={searchType === 'PG' ? "e.g. 8000" : searchType === 'Food' ? "e.g. 3000" : "e.g. 11000"}
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full bg-transparent text-navy font-dm font-bold text-base sm:text-lg outline-none placeholder:text-muted/40"
                />
              </div>
            </div>

            {/* Find Now button */}
            <div className="flex items-center">
              <button 
                onClick={() => {
                  const typeParam = searchType === 'Both' ? 'both' : searchType.toLowerCase()
                  navigate(`/search?city=${selectedCity}&college=${selectedCollege}&type=${typeParam}`)
                }}
                className="group w-full lg:w-auto h-[64px] whitespace-nowrap px-10 rounded-[1rem] bg-accent text-white font-dm font-extrabold text-lg hover:bg-accent-hover transition-all duration-300 shadow-xl shadow-accent/30 hover:shadow-2xl hover:shadow-accent/40 hover:-translate-y-1 transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3"
              >
                Search
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
            
          </div>
        </div>

        {/* Popular cities */}
        <div className="flex flex-wrap items-center gap-3 mt-8 justify-center">
          <span className="text-sm font-dm font-bold text-muted uppercase tracking-widest">Popular:</span>
          {popularCities.map((city) => (
            <button
              key={city}
              onClick={() => { setSelectedCity(city); setSelectedCollege('') }}
              className="px-5 py-2 rounded-full bg-white border border-border text-navy shadow-sm text-sm font-dm font-bold hover:bg-skyblue hover:border-skyblue hover:text-white transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 active:scale-95"
            >
              {city}
            </button>
          ))}
        </div>

      </div>
    </section>
  )
}
