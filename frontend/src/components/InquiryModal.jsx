import { useState } from 'react'
import { X } from 'lucide-react'

import { API_BASE_URL } from '../config'

export default function InquiryModal({ isOpen, onClose, propertyId, propertyTitle }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  if (!isOpen) return null

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE_URL}/api/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          propertyId,
          ...formData
        })
      })

      if (res.ok) {
        setSuccess(true)
        setTimeout(() => {
          onClose()
          setSuccess(false)
          setFormData({ name: '', email: '', phone: '', message: '' })
        }, 2000)
      } else {
        alert('Failed to send inquiry')
      }
    } catch (error) {
      console.error(error)
      alert('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 backdrop-blur-sm px-4">
      <div className="bg-white rounded-3xl w-full max-w-md p-6 relative shadow-2xl animate-fadeInUp">
        <button onClick={onClose} className="absolute top-4 right-4 text-muted hover:text-navy transition-colors">
          <X className="w-6 h-6" />
        </button>
        
        {success ? (
          <div className="text-center py-10">
            <div className="w-16 h-16 bg-green-100 text-success rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-sora font-bold text-xl text-navy">Inquiry Sent!</h3>
            <p className="text-muted mt-2">The owner will contact you shortly.</p>
          </div>
        ) : (
          <>
            <h2 className="font-sora font-bold text-2xl text-navy mb-2">Contact Owner</h2>
            <p className="text-sm text-muted mb-6">Inquiring about <span className="font-bold text-navy">{propertyTitle}</span></p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-navy mb-1">Your Name</label>
                <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border border-border rounded-lg outline-none focus:border-accent" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-bold text-navy mb-1">Phone Number</label>
                <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 border border-border rounded-lg outline-none focus:border-accent" placeholder="+91 9876543210" />
              </div>
              <div>
                <label className="block text-sm font-bold text-navy mb-1">Email Address (Optional)</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border border-border rounded-lg outline-none focus:border-accent" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-bold text-navy mb-1">Message</label>
                <textarea name="message" rows="3" value={formData.message} onChange={handleChange} className="w-full px-4 py-2 border border-border rounded-lg outline-none focus:border-accent" placeholder="I'm interested in renting a room..."></textarea>
              </div>
              
              <button disabled={loading} type="submit" className="w-full py-3 bg-navy text-white font-bold rounded-lg hover:bg-navy-dark transition-all disabled:opacity-50 mt-4">
                {loading ? 'Sending...' : 'Send Inquiry'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
