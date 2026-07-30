import { useState } from 'react'
import { Search, Map, MessageCircle, UserPlus, FileEdit, BellRing, Store, UtensilsCrossed, TrendingUp } from 'lucide-react'
import useScrollReveal from '../hooks/useScrollReveal'

const tabs = ['For Students', 'For Owners', 'For Restaurants']

const stepsData = {
  'For Students': [
    {
      num: 1,
      title: 'Search',
      desc: 'Enter your city + college. Set budget and preferences.',
      icon: <Search className="w-6 h-6" />
    },
    {
      num: 2,
      title: 'Discover',
      desc: 'Browse verified PGs and food on the map. Read reviews.',
      icon: <Map className="w-6 h-6" />
    },
    {
      num: 3,
      title: 'Connect',
      desc: 'Chat with owners directly. Book room and food in one place.',
      icon: <MessageCircle className="w-6 h-6" />
    },
  ],
  'For Owners': [
    {
      num: 1,
      title: 'Register',
      desc: 'Create your free GoSettle owner account in minutes.',
      icon: <UserPlus className="w-6 h-6" />
    },
    {
      num: 2,
      title: 'List',
      desc: 'Add PG details, room photos, pricing and amenities.',
      icon: <FileEdit className="w-6 h-6" />
    },
    {
      num: 3,
      title: 'Get Inquiries',
      desc: 'Receive direct student inquiries and fill rooms faster.',
      icon: <BellRing className="w-6 h-6" />
    },
  ],
  'For Restaurants': [
    {
      num: 1,
      title: 'Register',
      desc: 'Sign up as a mess, tiffin, or canteen provider.',
      icon: <Store className="w-6 h-6" />
    },
    {
      num: 2,
      title: 'Add Menu',
      desc: 'Upload your daily menu, pricing and photos.',
      icon: <UtensilsCrossed className="w-6 h-6" />
    },
    {
      num: 3,
      title: 'Get Orders',
      desc: 'Students near your campus discover and subscribe.',
      icon: <TrendingUp className="w-6 h-6" />
    },
  ],
}

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState('For Students')
  const revealRef = useScrollReveal()

  const steps = stepsData[activeTab]

  return (
    <section id="how-it-works" className="bg-white py-[72px] md:py-20">
      <div ref={revealRef} className="reveal max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-dm font-semibold mb-4">
            How It Works
          </span>
          <h2 className="font-sora font-bold text-[28px] sm:text-[32px] text-navy">
            Settle in 3 simple steps
          </h2>
        </div>

        {/* Tab switcher */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex bg-page rounded-2xl p-1.5 gap-2 border border-border shadow-sm">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 sm:px-8 py-3 rounded-xl font-dm font-bold text-sm transition-all duration-300 ${activeTab === tab
                    ? 'bg-navy text-white shadow-lg transform scale-105'
                    : 'text-muted hover:text-navy hover:bg-gray-100'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-6 relative">
          {steps.map((step, i) => (
            <div key={`${activeTab}-${step.num}`} className={`flex flex-col items-center text-center group cursor-pointer hover:-translate-y-2 transition-transform duration-300 ${i < steps.length - 1 ? 'step-connector' : ''}`}>
              {/* Icon Circle */}
              <div className="w-20 h-20 rounded-full bg-page border-2 border-accent text-accent flex items-center justify-center mb-6 shadow-xl shadow-accent/10 relative z-10 group-hover:bg-accent group-hover:text-white group-hover:scale-110 transition-all duration-300">
                {step.icon}
                <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-navy text-white font-sora font-bold text-sm flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                  {step.num}
                </div>
              </div>

              {/* Title */}
              <h3 className="font-sora font-bold text-xl text-navy mb-3">
                {step.title}
              </h3>

              {/* Description */}
              <p className="font-dm text-base text-muted leading-relaxed max-w-xs">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
