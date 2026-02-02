'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface TeamFormProps {
  member?: any
  onSuccess: () => void
  onCancel: () => void
}

export default function TeamForm({ member, onSuccess, onCancel }: TeamFormProps) {
  const [loading, setLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState(member?.imageUrl || '')
  const [dragActive, setDragActive] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  useEffect(() => {
    if (member) {
      reset(member)
      setImagePreview(member.imageUrl)
    }
  }, [member, reset])

  const onSubmit = async (data: any) => {
    setLoading(true)
    
    try {
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('arabicName', data.arabicName)
      formData.append('role', data.role)
      formData.append('phone', data.phone)
      formData.append('whatsapp', data.whatsapp)
      formData.append('email', data.email || '')
      formData.append('active', data.active)
      formData.append('order', data.order || '0')
      
      if (data.image && data.image[0]) {
        console.log('Image file selected:', data.image[0].name, 'Size:', data.image[0].size)
        formData.append('image', data.image[0])
      } else if (selectedFile) {
        console.log('Using drag-drop image:', selectedFile.name, 'Size:', selectedFile.size)
        formData.append('image', selectedFile)
      } else {
        console.log('No image file selected')
      }

      const url = member 
        ? `/api/admin/team/${member.id}`
        : '/api/admin/team'
      
      const method = member ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        body: formData
      })

      if (res.ok) {
        toast.success(member ? 'Team member updated!' : 'Team member created!')
        onSuccess()
      } else {
        throw new Error('Failed to save team member')
      }
    } catch (error) {
      toast.error('Failed to save team member')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
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
      setSelectedFile(files[0])
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
          <i className={`fas ${member ? 'fa-edit' : 'fa-plus'} mr-3`}></i>
          {member ? 'Edit Team Member' : 'Add New Team Member'}
        </h2>
      </div>

      <div className="p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Name and Arabic Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <label className="block text-sm font-bold text-gray-700 mb-3">
                <i className="fas fa-user mr-2 text-primary"></i>
                Full Name (English) *
              </label>
              <input
                {...register('name', { required: 'Name is required' })}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Team member name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-2 flex items-center">
                  <i className="fas fa-exclamation-circle mr-2"></i>
                  {errors.name.message as string}
                </p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <label className="block text-sm font-bold text-gray-700 mb-3">
                <i className="fas fa-user mr-2 text-primary"></i>
                الاسم (العربية) *
              </label>
              <input
                {...register('arabicName', { required: 'Arabic name is required' })}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 font-cairo text-right ${
                  errors.arabicName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="الاسم بالعربية"
              />
              {errors.arabicName && (
                <p className="text-red-500 text-sm mt-2 flex items-center">
                  <i className="fas fa-exclamation-circle mr-2"></i>
                  {errors.arabicName.message as string}
                </p>
              )}
            </motion.div>
          </div>

          {/* Role */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label className="block text-sm font-bold text-gray-700 mb-3">
              <i className="fas fa-briefcase mr-2 text-primary"></i>
              Job Title / Role *
            </label>
            <input
              {...register('role', { required: 'Role is required' })}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 ${
                errors.role ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., Sales Manager, Engineer"
            />
            {errors.role && (
              <p className="text-red-500 text-sm mt-2 flex items-center">
                <i className="fas fa-exclamation-circle mr-2"></i>
                {errors.role.message as string}
              </p>
            )}
          </motion.div>

          {/* Phone and WhatsApp */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-sm font-bold text-gray-700 mb-3">
                <i className="fas fa-phone mr-2 text-primary"></i>
                Phone Number *
              </label>
              <input
                {...register('phone', { required: 'Phone is required' })}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="+966 50 1234567"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-2 flex items-center">
                  <i className="fas fa-exclamation-circle mr-2"></i>
                  {errors.phone.message as string}
                </p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-sm font-bold text-gray-700 mb-3">
                <i className="fab fa-whatsapp mr-2 text-primary"></i>
                WhatsApp Number *
              </label>
              <input
                {...register('whatsapp', { required: 'WhatsApp is required' })}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 ${
                  errors.whatsapp ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="+966 50 1234567"
              />
              {errors.whatsapp && (
                <p className="text-red-500 text-sm mt-2 flex items-center">
                  <i className="fas fa-exclamation-circle mr-2"></i>
                  {errors.whatsapp.message as string}
                </p>
              )}
            </motion.div>
          </div>

          {/* Email and Order */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block text-sm font-bold text-gray-700 mb-3">
                <i className="fas fa-envelope mr-2 text-primary"></i>
                Email Address (Optional)
              </label>
              <input
                type="email"
                {...register('email')}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300"
                placeholder="email@example.com"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
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
          </div>

          {/* Image Upload */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <label className="block text-sm font-bold text-gray-700 mb-3">
              <i className="fas fa-image mr-2 text-primary"></i>
              Profile Photo
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
                  <p className="text-gray-700 font-semibold">Drag and drop your photo here</p>
                  <p className="text-gray-500 text-sm">or click to select from computer</p>
                </div>
              </label>
            </div>

            {imagePreview && (
              <div className="mt-6">
                <p className="text-sm font-semibold text-gray-700 mb-4">Photo Preview:</p>
                <div className="relative h-48 w-48 rounded-lg overflow-hidden shadow-lg">
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
            transition={{ delay: 0.8 }}
            className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
          >
            <input
              type="checkbox"
              {...register('active')}
              defaultChecked={member?.active ?? true}
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
            transition={{ delay: 0.9 }}
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
                  <i className={`fas ${member ? 'fa-check-circle' : 'fa-plus-circle'} mr-2`}></i>
                  {member ? 'Update Member' : 'Add Member'}
                </>
              )}
            </button>
          </motion.div>
        </form>
      </div>
    </motion.div>
  )
}
