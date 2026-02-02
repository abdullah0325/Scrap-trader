'use client'

import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

interface HeroSlide {
  id: string
  title: string
  arabicTitle: string
  description: string
  imageUrl: string
  buttonText?: string | null
  buttonLink?: string | null
  active: boolean
  order: number
}

export default function HeroPage() {
  const [slides, setSlides] = useState<HeroSlide[]>([])
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetchSlides()
  }, [])

  const fetchSlides = async () => {
    try {
      const res = await fetch('/api/admin/hero-slides')
      const data = await res.json()
      setSlides(Array.isArray(data) ? data : [])
    } catch (error) {
      toast.error('Failed to fetch slides')
      setSlides([])
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this slide?')) return
    
    try {
      const res = await fetch(`/api/admin/hero-slides/${id}`, {
        method: 'DELETE'
      })
      
      if (res.ok) {
        toast.success('Slide deleted successfully')
        fetchSlides()
      } else {
        toast.error('Failed to delete slide')
      }
    } catch (error) {
      toast.error('Failed to delete slide')
    }
  }

  const handleEdit = (slide: HeroSlide) => {
    setEditingSlide(slide)
    setShowForm(true)
  }

  const handleFormSubmit = () => {
    setShowForm(false)
    setEditingSlide(null)
    fetchSlides()
  }

  const handleOrderChange = async (id: string, newOrder: number) => {
    try {
      const res = await fetch(`/api/admin/hero-slides/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order: newOrder })
      })
      
      if (res.ok) {
        fetchSlides()
      }
    } catch (error) {
      toast.error('Failed to update order')
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 md:mb-8 gap-3 sm:gap-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Manage Hero Slides</h1>
        <button
          onClick={() => setShowForm(true)}
          className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base bg-[#0a5c36] text-white rounded-lg hover:bg-[#0a5c36]-dark"
        >
          Add New Slide
        </button>
      </div>

      {showForm && (
        <HeroSlideForm
          slide={editingSlide}
          onSuccess={handleFormSubmit}
          onCancel={() => {
            setShowForm(false)
            setEditingSlide(null)
          }}
        />
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {slides
              .sort((a, b) => a.order - b.order)
              .map((slide) => (
                <tr key={slide.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={slide.imageUrl}
                      alt={slide.title}
                      className="h-20 w-32 object-cover rounded"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium">{slide.title}</div>
                      <div className="text-sm text-gray-500 font-cairo">{slide.arabicTitle}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleOrderChange(slide.id, slide.order - 1)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <i className="fas fa-arrow-up"></i>
                      </button>
                      <span className="font-semibold">{slide.order}</span>
                      <button
                        onClick={() => handleOrderChange(slide.id, slide.order + 1)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <i className="fas fa-arrow-down"></i>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      slide.active 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {slide.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(slide)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(slide.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function HeroSlideForm({ slide, onSuccess, onCancel }: { slide: HeroSlide | null, onSuccess: () => void, onCancel: () => void }) {
  const [loading, setLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState(slide?.imageUrl || '')
  const [formData, setFormData] = useState({
    title: slide?.title || '',
    arabicTitle: slide?.arabicTitle || '',
    description: slide?.description || '',
    buttonText: slide?.buttonText || '',
    buttonLink: slide?.buttonLink || '',
    active: slide?.active ?? true,
    order: slide?.order || 0
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const data = new FormData()
      data.append('title', formData.title)
      data.append('arabicTitle', formData.arabicTitle)
      data.append('description', formData.description)
      data.append('buttonText', formData.buttonText)
      data.append('buttonLink', formData.buttonLink)
      data.append('active', formData.active.toString())
      data.append('order', formData.order.toString())
      
      const imageInput = document.getElementById('image') as HTMLInputElement
      if (imageInput?.files?.[0]) {
        data.append('image', imageInput.files[0])
      }

      const url = slide 
        ? `/api/admin/hero-slides/${slide.id}`
        : '/api/admin/hero-slides'
      
      const method = slide ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        body: data
      })

      if (res.ok) {
        toast.success(slide ? 'Slide updated!' : 'Slide created!')
        onSuccess()
      } else {
        throw new Error('Failed to save slide')
      }
    } catch (error) {
      toast.error('Failed to save slide')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-8">
      <h2 className="text-2xl font-bold mb-6">
        {slide ? 'Edit Hero Slide' : 'Add New Hero Slide'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title (English)
            </label>
            <input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title (Arabic)
            </label>
            <input
              value={formData.arabicTitle}
              onChange={(e) => setFormData({ ...formData, arabicTitle: e.target.value })}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md font-cairo text-right"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Button Text (Optional)
            </label>
            <input
              value={formData.buttonText}
              onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Button Link (Optional)
            </label>
            <input
              value={formData.buttonLink}
              onChange={(e) => setFormData({ ...formData, buttonLink: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Order
              </label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex items-end pb-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="h-4 w-4 text-[#0a5c36] rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Active</span>
              </label>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) {
                const reader = new FileReader()
                reader.onloadend = () => {
                  setImagePreview(reader.result as string)
                }
                reader.readAsDataURL(file)
              }
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {imagePreview && (
            <div className="mt-4">
              <img
                src={imagePreview}
                alt="Preview"
                className="h-48 w-auto object-cover rounded"
              />
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-[#0a5c36] text-white rounded-md hover:bg-[#0a5c36]-dark disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Saving...' : slide ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  )
}





