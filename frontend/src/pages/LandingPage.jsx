import { useEffect } from 'react'
import useSEO from '../hooks/useSEO'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import SmartSearch from '../components/SmartSearch'
import HowItWorks from '../components/HowItWorks'
import FeaturedListings from '../components/FeaturedListings'
import DualCTA from '../components/DualCTA'
import Testimonials from '../components/Testimonials'
import OwnerCTA from '../components/OwnerCTA'
import Footer from '../components/Footer'

export default function LandingPage() {
  useSEO({
    title: 'Move Cities. Not Problems',
    description: 'Find verified PGs and food near your college. Chat with owners directly. Settle in days — not weeks.',
    keywords: 'student PG, student housing India, tiffin near college, hostel booking, GoSettle'
  })

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Lenis) {
      const lenis = new window.Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
      })

      function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }

      requestAnimationFrame(raf)

      return () => {
        lenis.destroy()
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-page font-dm text-body overflow-x-hidden">
      <Navbar />
      <main className="animate-fadeIn">
        <Hero />
        <SmartSearch />
        <HowItWorks />
        <FeaturedListings />
        <DualCTA />
        <Testimonials />
        <OwnerCTA />
      </main>
      <Footer />
    </div>
  )
}
