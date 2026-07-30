import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Navbar from '../../components/Navbar'

import { API_BASE_URL } from '../../config'

export default function AddPropertyPage() {
  const { token } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'PG',
    city: '',
    college: '',
    cuisine: '',
    gender: 'COED',
    price: '',
    amenities: '',
    images: ''
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        amenities: formData.amenities.split(',').map(a => a.trim()).filter(a => a),
        images: formData.images.split(',').map(i => i.trim()).filter(i => i)
      }

      if (payload.type === 'PG') {
        delete payload.cuisine
      } else if (payload.type === 'RESTAURANT') {
        delete payload.gender
      }

      const res = await fetch(`${API_BASE_URL}/api/properties`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      })

      if (res.ok) {
        navigate('/dashboard/pg')
      } else {
        const errorData = await res.json()
        alert(errorData.message || 'Failed to create listing')
      }
    } catch (err) {
      console.error(err)
      alert('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-page font-dm text-body flex flex-col pb-20">
      <Navbar />
      <main className="flex-grow pt-[100px] px-6 max-w-3xl mx-auto w-full animate-fadeIn">
        <div className="bg-white p-8 rounded-3xl border border-border shadow-xl">
          <h1 className="font-sora font-bold text-3xl text-navy mb-6">Add New Listing</h1>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-navy mb-1">
                {formData.type === 'PG' ? 'PG/Hostel Name' : 'Restaurant/Mess Name'}
              </label>
              <input type="text" name="title" required value={formData.title} onChange={handleChange} className="w-full px-4 py-2 border border-border rounded-lg outline-none focus:border-accent" placeholder={formData.type === 'PG' ? "e.g. Sunrise Premium PG" : "e.g. Anandha Bhavan"} />
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-bold text-navy mb-1">Type</label>
                <select name="type" value={formData.type} onChange={handleChange} className="w-full px-4 py-2 border border-border rounded-lg outline-none focus:border-accent">
                  <option value="PG">PG / Hostel</option>
                  <option value="RESTAURANT">Restaurant / Mess</option>
                </select>
              </div>
              
              {formData.type === 'PG' && (
                <div>
                  <label className="block text-sm font-bold text-navy mb-1">Gender</label>
                  <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-4 py-2 border border-border rounded-lg outline-none focus:border-accent">
                    <option value="BOYS">Boys</option>
                    <option value="GIRLS">Girls</option>
                    <option value="COED">Co-ed</option>
                  </select>
                </div>
              )}

              {formData.type === 'RESTAURANT' && (
                <div>
                  <label className="block text-sm font-bold text-navy mb-1">Cuisine</label>
                  <input type="text" name="cuisine" value={formData.cuisine} onChange={handleChange} className="w-full px-4 py-2 border border-border rounded-lg outline-none focus:border-accent" placeholder="e.g. North Indian, Chinese" />
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-bold text-navy mb-1">City</label>
                <input type="text" name="city" required value={formData.city} onChange={handleChange} className="w-full px-4 py-2 border border-border rounded-lg outline-none focus:border-accent" placeholder="e.g. Bangalore" />
              </div>
              <div>
                <label className="block text-sm font-bold text-navy mb-1">Nearest College</label>
                <input type="text" name="college" value={formData.college} onChange={handleChange} className="w-full px-4 py-2 border border-border rounded-lg outline-none focus:border-accent" placeholder="e.g. Christ University" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-navy mb-1">
                {formData.type === 'PG' ? 'Monthly Price (₹)' : 'Average Cost for Two (₹)'}
              </label>
              <input type="number" name="price" required min="0" value={formData.price} onChange={handleChange} className="w-full px-4 py-2 border border-border rounded-lg outline-none focus:border-accent" placeholder={formData.type === 'PG' ? "e.g. 5500" : "e.g. 300"} />
            </div>

            <div>
              <label className="block text-sm font-bold text-navy mb-1">Description</label>
              <textarea name="description" required rows="4" value={formData.description} onChange={handleChange} className="w-full px-4 py-2 border border-border rounded-lg outline-none focus:border-accent" placeholder="Describe the property..."></textarea>
            </div>

            <div>
              <label className="block text-sm font-bold text-navy mb-1">Amenities (Comma separated)</label>
              <input type="text" name="amenities" value={formData.amenities} onChange={handleChange} className="w-full px-4 py-2 border border-border rounded-lg outline-none focus:border-accent" placeholder="WiFi, AC, Laundry..." />
            </div>

            <div>
              <label className="block text-sm font-bold text-navy mb-1">Image URLs (Comma separated)</label>
              <input type="text" name="images" value={formData.images} onChange={handleChange} className="w-full px-4 py-2 border border-border rounded-lg outline-none focus:border-accent" placeholder="https://image1.jpg, https://image2.jpg" />
            </div>

            <div className="pt-4">
              <button disabled={loading} type="submit" className="w-full py-3 bg-navy text-white font-bold rounded-lg hover:bg-navy-dark transition-all disabled:opacity-50">
                {loading ? 'Creating...' : 'Create Listing'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
