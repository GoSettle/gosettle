import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Navbar from '../../components/Navbar'
import useSEO from '../../hooks/useSEO'
import { Building2, Eye, MessageSquare, Plus, Bell } from 'lucide-react'

import { API_BASE_URL } from '../../config'

export default function PgDashboard() {
  const { owner, token, logout } = useAuth()
  const [stats, setStats] = useState({
    activeListings: 0,
    totalViews: 0,
    totalInquiries: 0,
    recentActivity: []
  })
  const [isLoading, setIsLoading] = useState(true)

  useSEO({
    title: 'PG Dashboard',
    description: 'Manage your PG listings, view inquiries, and update availability on GoSettle.',
  })

  useEffect(() => {
    const fetchDashboardStats = async () => {
      if (!token) return;
      try {
        const res = await fetch(`${API_BASE_URL}/api/properties/owner/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboardStats();
  }, [token]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-page font-dm text-body flex flex-col items-center justify-center">
        <Navbar />
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
          <p className="text-navy font-bold text-sm">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-page font-dm text-body flex flex-col">
      <Navbar />
      <main className="flex-grow pt-[100px] px-4 sm:px-6 lg:px-8 max-w-[1280px] mx-auto w-full animate-fadeIn pb-12">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <div>
            <h1 className="font-sora font-bold text-3xl text-navy">Overview</h1>
            <p className="text-muted text-sm mt-1">Welcome back, {owner?.name}. Here's what's happening with your properties.</p>
          </div>
          <Link to="/dashboard/add-property" className="px-5 py-2.5 bg-navy text-white rounded-xl font-bold text-sm hover:bg-navy-dark transition-all duration-300 shadow-lg shadow-navy/20 hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2 active:scale-95">
            <Plus className="w-4 h-4" />
            Add New Listing
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500 text-skyblue">
               <Building2 className="w-20 h-20 -mr-4 -mt-4" />
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-skyblue-light flex items-center justify-center text-skyblue">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-muted text-xs uppercase tracking-widest">Active Listings</h3>
            </div>
            <p className="text-4xl font-sora font-extrabold text-navy">{stats.activeListings}</p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500 text-accent">
               <Eye className="w-20 h-20 -mr-4 -mt-4" />
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-muted text-xs uppercase tracking-widest">Total Views</h3>
            </div>
            <p className="text-4xl font-sora font-extrabold text-navy">{stats.totalViews}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500 text-green-500">
               <MessageSquare className="w-20 h-20 -mr-4 -mt-4" />
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-500">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-muted text-xs uppercase tracking-widest">Total Inquiries</h3>
            </div>
            <p className="text-4xl font-sora font-extrabold text-navy">{stats.totalInquiries}</p>
          </div>
        </div>

        {/* Recent Activity Table/List */}
        <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-border bg-gray-50/50 flex items-center gap-3">
            <Bell className="w-5 h-5 text-muted" />
            <h2 className="font-sora font-bold text-lg text-navy">Recent Activity</h2>
          </div>
          <div className="p-0">
            {stats.recentActivity.length > 0 ? (
              <div className="divide-y divide-border">
                {stats.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 hover:bg-page/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex flex-shrink-0 items-center justify-center text-accent">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold text-navy text-sm">New inquiry from {activity.name}</p>
                        <p className="text-muted text-xs mt-0.5">Interested in <span className="font-semibold text-navy/70">{activity.property?.title}</span></p>
                      </div>
                    </div>
                    <div className="text-xs text-muted font-medium sm:text-right bg-page px-3 py-1.5 rounded-lg border border-border/50 self-start sm:self-auto">
                      {new Date(activity.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-10 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-page rounded-full flex items-center justify-center mb-4 text-muted/30">
                  <Bell className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-navy">No recent activity</h4>
                <p className="text-muted text-sm mt-1">When someone inquires about your property, it will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
