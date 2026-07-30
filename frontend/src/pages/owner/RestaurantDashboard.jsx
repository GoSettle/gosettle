import { useAuth } from '../../context/AuthContext'
import Navbar from '../../components/Navbar'
import useSEO from '../../hooks/useSEO'
import { UtensilsCrossed, Users, IndianRupee, Plus, Bell, RotateCw } from 'lucide-react'

export default function RestaurantDashboard() {
  const { owner, logout } = useAuth()

  useSEO({
    title: 'Restaurant Dashboard',
    description: 'Manage your restaurant listings, menus, and food subscriptions on GoSettle.',
  })

  return (
    <div className="min-h-screen bg-page font-dm text-body flex flex-col">
      <Navbar />
      <main className="flex-grow pt-[100px] px-4 sm:px-6 lg:px-8 max-w-[1280px] mx-auto w-full animate-fadeIn pb-12">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <div>
            <h1 className="font-sora font-bold text-3xl text-navy">Overview</h1>
            <p className="text-muted text-sm mt-1">Welcome back, {owner?.name}. Here's what's happening with your restaurant/tiffin service.</p>
          </div>
          <button className="px-5 py-2.5 bg-navy text-white rounded-xl font-bold text-sm hover:bg-navy-dark transition-all duration-300 shadow-lg shadow-navy/20 hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2 active:scale-95">
            <Plus className="w-4 h-4" />
            Add New Listing
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500 text-skyblue">
               <UtensilsCrossed className="w-20 h-20 -mr-4 -mt-4" />
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-skyblue-light flex items-center justify-center text-skyblue">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-muted text-xs uppercase tracking-widest">Active Listings</h3>
            </div>
            <p className="text-4xl font-sora font-extrabold text-navy">1</p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500 text-accent">
               <Users className="w-20 h-20 -mr-4 -mt-4" />
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-muted text-xs uppercase tracking-widest">Total Subscribers</h3>
            </div>
            <p className="text-4xl font-sora font-extrabold text-navy">12</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500 text-green-500">
               <IndianRupee className="w-20 h-20 -mr-4 -mt-4" />
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-500">
                <IndianRupee className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-muted text-xs uppercase tracking-widest">Monthly Revenue</h3>
            </div>
            <p className="text-4xl font-sora font-extrabold text-navy">₹32k</p>
          </div>
        </div>

        {/* Recent Activity Table/List */}
        <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-border bg-gray-50/50 flex items-center gap-3">
            <Bell className="w-5 h-5 text-muted" />
            <h2 className="font-sora font-bold text-lg text-navy">Recent Subscriptions</h2>
          </div>
          <div className="p-0">
            <div className="divide-y divide-border">
              {/* Activity 1 */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 hover:bg-page/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex flex-shrink-0 items-center justify-center text-accent">
                    <Plus className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-navy text-sm">New monthly subscription</p>
                    <p className="text-muted text-xs mt-0.5">Aman Gupta <span className="mx-1">·</span> <span className="font-semibold text-green-600">₹3,000 paid</span></p>
                  </div>
                </div>
                <div className="text-xs text-muted font-medium sm:text-right bg-page px-3 py-1.5 rounded-lg border border-border/50 self-start sm:self-auto">
                  3 hours ago
                </div>
              </div>

              {/* Activity 2 */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 hover:bg-page/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-skyblue-light flex flex-shrink-0 items-center justify-center text-skyblue">
                    <RotateCw className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-navy text-sm">Subscription renewed</p>
                    <p className="text-muted text-xs mt-0.5">Priya K. <span className="mx-1">·</span> <span className="font-semibold text-green-600">₹2,500 paid</span></p>
                  </div>
                </div>
                <div className="text-xs text-muted font-medium sm:text-right bg-page px-3 py-1.5 rounded-lg border border-border/50 self-start sm:self-auto">
                  Yesterday
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
