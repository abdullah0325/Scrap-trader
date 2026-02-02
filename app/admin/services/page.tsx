'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import ServiceForm from '@/components/admin/ServiceForm'
import Image from 'next/image'

interface Service {
  id: string
  title: string
  arabicTitle: string
  description: string
  imageUrl: string
  icon: string
  active: boolean
  order: number
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [showForm, setShowForm] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/admin/services')
      const data = await res.json()
      setServices(Array.isArray(data) ? data : [])
    } catch (error) {
      toast.error('Failed to fetch services')
      setServices([])
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return
    
    try {
      const res = await fetch(`/api/admin/services/${id}`, {
        method: 'DELETE'
      })
      
      if (res.ok) {
        toast.success('Service deleted successfully')
        fetchServices()
      } else {
        toast.error('Failed to delete service')
      }
    } catch (error) {
      toast.error('Failed to delete service')
    }
  }

  const handleEdit = (service: Service) => {
    setEditingService(service)
    setShowForm(true)
  }

  const handleFormSubmit = () => {
    setShowForm(false)
    setEditingService(null)
    fetchServices()
  }

  return (
    <div className="p-3 sm:p-4 md:p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 md:mb-8 gap-3 sm:gap-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Manage Services</h1>
        <button
          onClick={() => {
            setEditingService(null)
            setShowForm(true)
          }}
          className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg hover:opacity-90 transition font-semibold"
        >
          <i className="fas fa-plus mr-2"></i>
          Add New Service
        </button>
      </div>

      {showForm && (
        <ServiceForm
          service={editingService}
          onSuccess={handleFormSubmit}
          onCancel={() => {
            setShowForm(false)
            setEditingService(null)
          }}
        />
      )}

      {services.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <i className="fas fa-inbox text-4xl text-gray-400 mb-4"></i>
          <p className="text-gray-600 text-lg">No services yet. Create your first service!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
              {/* Image */}
              {service.imageUrl && (
                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={service.imageUrl}
                    alt={service.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              )}
              
              {/* Content */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{service.title}</h3>
                    <p className="text-sm text-gray-500 font-cairo">{service.arabicTitle}</p>
                  </div>
                  {service.icon && (
                    <i className={`${service.icon} text-2xl text-[#0a5c36]`}></i>
                  )}
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                    service.active
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {service.active ? 'Active' : 'Inactive'}
                  </span>
                  <span className="text-xs text-gray-500">Order: {service.order}</span>
                </div>
                
                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(service)}
                    className="flex-1 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm font-medium"
                  >
                    <i className="fas fa-edit mr-1"></i>
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="flex-1 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm font-medium"
                  >
                    <i className="fas fa-trash mr-1"></i>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

