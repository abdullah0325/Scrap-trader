'use client'

import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { motion } from 'framer-motion'

export default function ContactSection() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    materialType: '',
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/admin/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        toast.success('Message sent successfully!')
        setFormData({
          name: '',
          phone: '',
          email: '',
          materialType: '',
          message: '',
        })
      } else {
        toast.error('Failed to send message. Please try again.')
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.')
      console.error('Contact form error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleWhatsAppClick = () => {
    if (!formData.name || !formData.phone) {
      toast.error('Please fill in name and phone number first')
      return
    }

    const whatsappMessage = encodeURIComponent(
      `Hello Saudi Scrap Trader!\n\n` +
      `Name: ${formData.name}\n` +
      `Phone: ${formData.phone}\n` +
      `Email: ${formData.email || 'Not provided'}\n` +
      `Material Type: ${formData.materialType || 'Not specified'}\n` +
      `Message: ${formData.message}\n\n` +
      `Please contact me regarding my inquiry.`
    )
    window.open(`https://wa.me/966583954403?text=${whatsappMessage}`, '_blank')
    // Opens Baroz Khan's number
  }

  const materialTypes = [
    'Select material type',
    'Iron',
    'Copper',
    'Aluminum',
    'Steel',
    'Brass',
    'Stainless Steel',
    'Electrical Scrap',
    'Construction Scrap',
    'Industrial Waste',
    'Other'
  ]

  return (
    <section id="contact" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">Contact Us</h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Get in touch with us for scrap trading inquiries or request a free quote
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          
          {/* Left Column - Contact Info */}
          <div className="lg:w-1/2">
            <div className="space-y-8">
              {/* Contact Information */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Contact Information
                </h3>
                
                <div className="space-y-6">
                  {/* Phone */}
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-[#b87333]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-phone text-[#b87333] text-lg"></i>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-gray-900">Call Us</h4>
                      <div className="mt-1 space-y-1">
                        <a href="tel:+9660531901277" className="text-gray-600 hover:text-[#b87333] block">
                          +966 0531 901 277 (Amjad)
                        </a>
                        <a href="tel:+9660583954403" className="text-gray-600 hover:text-[#b87333] block">
                          +966 0583 954 403 (Baroz)
                       </a>
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-[#25D366]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="fab fa-whatsapp text-[#25D366] text-lg"></i>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-gray-900">WhatsApp</h4>
                      <div className="mt-1 space-y-1">
                        <a 
                          href="https://wa.me/966531901277" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-[#25D366] block"
                        >
                          +966 53 190 1277 (Amjad)
                        </a>
                        <a 
                          href="https://wa.me/966583954403" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-[#25D366] block"
                        >
                          +966 58 395 4403 (Baroz)
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-[#2c3e50]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-envelope text-[#2c3e50] text-lg"></i>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-gray-900">Email</h4>
                      <a href="mailto:info@saudiscraptrader.com" className="text-gray-600 hover:text-[#2c3e50] block mt-1">
                        info@saudiscraptrader.com
                      </a>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-[#f1c40f]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-clock text-[#f1c40f] text-lg"></i>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-gray-900">Business Hours</h4>
                      <p className="text-gray-600 mt-1">
                        24/7 Service Available<br />
                        Sunday - Saturday
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why Contact Us */}
              
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Send Your Inquiry
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b87333] focus:border-[#b87333]"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b87333] focus:border-[#b87333]"
                      placeholder="+966 XXXXXXXX"
                    />
                  </div>
                </div>

                {/* Email & Material */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b87333] focus:border-[#b87333]"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="materialType" className="block text-sm font-medium text-gray-700 mb-1">
                      Material Type
                    </label>
                    <select
                      id="materialType"
                      name="materialType"
                      value={formData.materialType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b87333] focus:border-[#b87333] bg-white"
                    >
                      {materialTypes.map((type) => (
                        <option key={type} value={type === 'Select material type' ? '' : type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b87333] focus:border-[#b87333] resize-none"
                    placeholder="Tell us about your scrap materials, quantity, location..."
                  />
                </div>

                {/* Two Buttons at Bottom */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-3 bg-[#2c3e50] text-white font-medium rounded-lg hover:bg-[#1a252f] transition-colors disabled:opacity-50 flex items-center justify-center"
                  >
                    {loading ? (
                      <>
                        <i className="fas fa-spinner animate-spin mr-2"></i>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane mr-2"></i>
                        Submit Inquiry
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppClick}
                    className="flex-1 py-3 bg-[#25D366] text-white font-medium rounded-lg hover:bg-[#1da851] transition-colors flex items-center justify-center"
                  >
                    <i className="fab fa-whatsapp mr-2"></i>
                    WhatsApp Now
                  </button>
                </div>
              </form>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}