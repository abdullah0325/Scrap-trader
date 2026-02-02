'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import MaterialForm from '@/components/admin/MaterialForm'
import { toast } from 'react-hot-toast'

interface Material {
  id: string
  title: string
  arabicTitle: string
  description: string
  imageUrl: string
  category: string
  price: string
  active: boolean
  order: number
}

export default function MaterialsPage() {
  const [materials, setMaterials] = useState<Material[]>([])
  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null)
  const [showForm, setShowForm] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetchMaterials()
  }, [])

  const fetchMaterials = async () => {
    try {
      const res = await fetch('/api/admin/materials')
      const data = await res.json()
      setMaterials(Array.isArray(data) ? data : [])
    } catch (error) {
      toast.error('Failed to fetch materials')
      setMaterials([])
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this material?')) return
    
    try {
      const res = await fetch(`/api/admin/materials/${id}`, {
        method: 'DELETE'
      })
      
      if (res.ok) {
        toast.success('Material deleted successfully')
        fetchMaterials()
      } else {
        toast.error('Failed to delete material')
      }
    } catch (error) {
      toast.error('Failed to delete material')
    }
  }

  const handleEdit = (material: Material) => {
    setEditingMaterial(material)
    setShowForm(true)
  }

  const handleFormSubmit = () => {
    setShowForm(false)
    setEditingMaterial(null)
    fetchMaterials()
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 md:mb-8 gap-3 sm:gap-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Manage Materials</h1>
        <button
          onClick={() => setShowForm(true)}
          className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base bg-[#0a5c36] text-white rounded-lg hover:bg-[#084328] font-semibold transition-colors duration-300 flex items-center justify-center sm:justify-start"
        >
          <i className="fas fa-plus mr-2"></i>
          Add New Material
        </button>
      </div>

      {showForm && (
        <div className="mb-8">
          <MaterialForm
            material={editingMaterial}
            onSuccess={handleFormSubmit}
            onCancel={() => {
              setShowForm(false)
              setEditingMaterial(null)
            }}
          />
        </div>
      )}

      {/* Desktop Table View */}
      <div className="hidden sm:block bg-white rounded-lg shadow-lg overflow-x-auto horizontal-scroll">
        <table className="w-full min-w-max divide-y divide-gray-200">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Image
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Title
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Category
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Price
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {materials.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 sm:px-6 py-8 text-center text-gray-500">
                  <i className="fas fa-inbox text-3xl mb-3 block opacity-50"></i>
                  No materials found. Create one to get started!
                </td>
              </tr>
            ) : (
              materials.map((material) => (
                <tr key={material.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <img
                      src={material.imageUrl || 'https://via.placeholder.com/48x48?text=No+Image'}
                      alt={material.title}
                      className="h-10 sm:h-12 w-10 sm:w-12 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 sm:px-6 py-4 min-w-[200px]">
                    <div>
                      <div className="font-medium text-sm sm:text-base text-gray-900">{material.title}</div>
                      <div className="text-xs text-gray-500 font-cairo">
                        {material.arabicTitle}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap min-w-[120px]">
                    <span className="text-xs sm:text-sm text-gray-700">{material.category}</span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap min-w-[100px]">
                    <span className="text-xs sm:text-sm font-medium text-gray-900">{material.price}</span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      material.active 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {material.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={() => handleEdit(material)}
                        className="text-sm px-3 py-1.5 text-indigo-600 hover:bg-indigo-50 rounded transition-colors duration-200 font-medium"
                        title="Edit"
                      >
                        <i className="fas fa-edit sm:hidden"></i>
                        <span className="hidden sm:inline">Edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(material.id)}
                        className="text-sm px-3 py-1.5 text-red-600 hover:bg-red-50 rounded transition-colors duration-200 font-medium"
                        title="Delete"
                      >
                        <i className="fas fa-trash sm:hidden"></i>
                        <span className="hidden sm:inline">Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="sm:hidden space-y-3">
        {materials.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <i className="fas fa-inbox text-3xl text-gray-400 mb-3"></i>
            <p className="text-gray-600">No materials found. Create one to get started!</p>
          </div>
        ) : (
          materials.map((material) => (
            <div key={material.id} className="bg-white rounded-lg shadow-md p-4 space-y-3">
              {/* Header with Image and Title */}
              <div className="flex gap-3">
                <img
                  src={material.imageUrl || 'https://via.placeholder.com/48x48?text=No+Image'}
                  alt={material.title}
                  className="h-12 w-12 object-cover rounded flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">{material.title}</h3>
                  <p className="text-xs text-gray-500 font-cairo truncate">{material.arabicTitle}</p>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-xs text-gray-500">Category</p>
                  <p className="font-medium text-gray-900">{material.category}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Price</p>
                  <p className="font-medium text-gray-900">{material.price}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-gray-500 mb-1">Status</p>
                  <span className={`inline-flex text-xs leading-5 font-semibold rounded-full px-2 py-1 ${
                    material.active 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {material.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2 border-t border-gray-100">
                <button
                  onClick={() => handleEdit(material)}
                  className="flex-1 py-2 px-3 bg-indigo-50 text-indigo-600 rounded font-medium text-sm hover:bg-indigo-100 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <i className="fas fa-edit"></i>
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(material.id)}
                  className="flex-1 py-2 px-3 bg-red-50 text-red-600 rounded font-medium text-sm hover:bg-red-100 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <i className="fas fa-trash"></i>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {materials.length > 0 && (
        <div className="mt-4 text-sm text-gray-500 text-center sm:text-left">
          Showing {materials.length} material{materials.length !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  )
}
