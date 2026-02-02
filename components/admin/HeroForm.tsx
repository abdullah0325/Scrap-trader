'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface HeroFormProps {
  slide?: any
  onSuccess: () => void
  onCancel: () => void
}

export default function HeroForm({ slide, onSuccess, onCancel }: HeroFormProps) {
  const [loading, setLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState(slide?.imageUrl || '')
  const [dragActive, setDragActive] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  useEffect(() => {
    if (slide) {
      reset(slide)
      setImagePreview(slide.imageUrl)
    }
  }, [slide, reset])

  const onSubmit = async (data: any) => {
    setLoading(true)
    
    try {
      const formData = new FormData()
      formData.append('title', data.title)
      formData.append('arabicTitle', data.arabicTitle)
      formData.append('description', data.description)
      formData.append('buttonText', data.buttonText || '')
      formData.append('buttonLink', data.buttonLink || '')
      formData.append('active', data.active)
      formData.append('order', data.order || '0')
      
      if (data.image && data.image[0]) {
        formData.append('image', data.image[0])
      }

      const url = slide 
        ? `/api/admin/hero-slides/${slide.id}`
        : '/api/admin/hero-slides'
      
      const method = slide ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        body: formData
      })

      if (res.ok) {
        toast.success(slide ? 'Slide updated!' : 'Slide created!')
        onSuccess()
      } else {
        throw new Error('Failed to save slide')
      }
    } catch (error) {
      toast.error('Failed to save slide')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    const files = e.dataTransfer?.files
    if (files && files[0]) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(files[0])
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden"
    >
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white p-8">
        <h2 className="text-3xl font-bold flex items-center">
          <i className={`fas ${slide ? 'fa-edit' : 'fa-plus'} mr-3`}></i>
          {slide ? 'Edit Hero Slide' : 'Add New Hero Slide'}
        </h2>
      </div>

      <div className="p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* English and Arabic Titles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <label className="block text-sm font-bold text-gray-700 mb-3">
                <i className="fas fa-heading mr-2 text-primary"></i>
                Title (English) *
              </label>
              <input
                {...register('title', { required: 'Title is required' })}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Hero slide title"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-2 flex items-center">
                  <i className="fas fa-exclamation-circle mr-2"></i>
                  {errors.title.message as string}
                </p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <label className="block text-sm font-bold text-gray-700 mb-3">
                <i className="fas fa-heading mr-2 text-primary"></i>
                العنوان (العربية) *
              </label>
              <input
                {...register('arabicTitle', { required: 'Arabic title is required' })}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 font-cairo text-right ${
                  errors.arabicTitle ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="العنوان بالعربية"
              />
              {errors.arabicTitle && (
                <p className="text-red-500 text-sm mt-2 flex items-center">
                  <i className="fas fa-exclamation-circle mr-2"></i>
                  {errors.arabicTitle.message as string}
                </p>
              )}
            </motion.div>
          </div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label className="block text-sm font-bold text-gray-700 mb-3">
              <i className="fas fa-align-left mr-2 text-primary"></i>
              Description *
            </label>
            <textarea
              {...register('description', { required: 'Description is required' })}
              rows={3}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 resize-none ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Describe the hero slide..."
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-2 flex items-center">
                <i className="fas fa-exclamation-circle mr-2"></i>
                {errors.description.message as string}
              </p>
            )}
          </motion.div>

          {/* Button Text and Link */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-sm font-bold text-gray-700 mb-3">
                <i className="fas fa-mouse mr-2 text-primary"></i>
                Button Text (Optional)
              </label>
              <input
                {...register('buttonText')}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300"
                placeholder="e.g., Learn More"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-sm font-bold text-gray-700 mb-3">
                <i className="fas fa-link mr-2 text-primary"></i>
                Button Link (Optional)
              </label>
              <input
                {...register('buttonLink')}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300"
                placeholder="e.g., https://example.com"
              />
            </motion.div>
          </div>

          {/* Order */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <label className="block text-sm font-bold text-gray-700 mb-3">
              <i className="fas fa-sort-numeric-up mr-2 text-primary"></i>
              Display Order
            </label>
            <input
              type="number"
              {...register('order')}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300"
              placeholder="0"
            />
          </motion.div>

          {/* Image Upload */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <label className="block text-sm font-bold text-gray-700 mb-3">
              <i className="fas fa-image mr-2 text-primary"></i>
              Hero Image
            </label>
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
                dragActive
                  ? 'border-primary bg-primary/10'
                  : 'border-gray-300 hover:border-primary/50'
              }`}
            >
              <input
                type="file"
                accept="image/*"
                {...register('image')}
                onChange={handleImageChange}
                className="hidden"
                id="image-input"
              />
              <label htmlFor="image-input" className="cursor-pointer">
                <div className="flex flex-col items-center space-y-2">
                  <i className="fas fa-cloud-upload-alt text-4xl text-primary"></i>
                  <p className="text-gray-700 font-semibold">Drag and drop your image here</p>
                  <p className="text-gray-500 text-sm">or click to select from computer</p>
                </div>
              </label>
            </div>

            {imagePreview && (
              <div className="mt-6">
                <p className="text-sm font-semibold text-gray-700 mb-4">Image Preview:</p>
                <div className="relative h-48 w-full rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}
          </motion.div>

          {/* Active Checkbox */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
          >
            <input
              type="checkbox"
              {...register('active')}
              defaultChecked={slide?.active ?? true}
              id="active"
              className="w-5 h-5 text-primary rounded cursor-pointer"
            />
            <label htmlFor="active" className="flex items-center cursor-pointer">
              <i className="fas fa-check-circle mr-2 text-primary text-lg"></i>
              <span className="font-semibold text-gray-700">Active / Visible</span>
            </label>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex justify-end space-x-4 pt-6 border-t"
          >
            <button
              type="button"
              onClick={onCancel}
              className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300 disabled:opacity-50"
              disabled={loading}
            >
              <i className="fas fa-times mr-2"></i>
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              disabled={loading}
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner animate-spin mr-2"></i>
                  Saving...
                </>
              ) : (
                <>
                  <i className={`fas ${slide ? 'fa-check-circle' : 'fa-plus-circle'} mr-2`}></i>
                  {slide ? 'Update Slide' : 'Create Slide'}
                </>
              )}
            </button>
          </motion.div>
        </form>
      </div>
    </motion.div>
  )
}
