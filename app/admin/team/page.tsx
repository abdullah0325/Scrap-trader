'use client'

import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

interface TeamMember {
  id: string
  name: string
  arabicName: string
  role: string
  phone: string
  whatsapp: string
  email?: string | null
  imageUrl: string
  active: boolean
  order: number
}

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([])
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetchMembers()
  }, [])

  const fetchMembers = async () => {
    try {
      const res = await fetch('/api/admin/team')
      const data = await res.json()
      setMembers(Array.isArray(data) ? data : [])
    } catch (error) {
      toast.error('Failed to fetch team members')
      setMembers([])
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this team member?')) return
    
    try {
      const res = await fetch(`/api/admin/team/${id}`, {
        method: 'DELETE'
      })
      
      if (res.ok) {
        toast.success('Team member deleted successfully')
        fetchMembers()
      } else {
        toast.error('Failed to delete team member')
      }
    } catch (error) {
      toast.error('Failed to delete team member')
    }
  }

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member)
    setShowForm(true)
  }

  const handleFormSubmit = () => {
    setShowForm(false)
    setEditingMember(null)
    fetchMembers()
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 md:mb-8 gap-3 sm:gap-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Manage Team</h1>
        <button
          onClick={() => setShowForm(true)}
          className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base bg-[#0a5c36] text-white rounded-lg hover:bg-[#084328] font-semibold transition-colors duration-300 flex items-center justify-center sm:justify-start"
        >
          <i className="fas fa-plus mr-2"></i>
          Add New Member
        </button>
      </div>

      {showForm && (
        <TeamMemberForm
          member={editingMember}
          onSuccess={handleFormSubmit}
          onCancel={() => {
            setShowForm(false)
            setEditingMember(null)
          }}
        />
      )}

      {members.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 sm:p-12 text-center">
          <i className="fas fa-users text-4xl text-gray-400 mb-4"></i>
          <p className="text-gray-600 text-lg">No team members yet. Add your first member!</p>
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden sm:block bg-white rounded-lg shadow-lg overflow-x-auto horizontal-scroll">
            <table className="w-full min-w-max divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Contact
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
                {members.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <img
                        src={member.imageUrl}
                        alt={member.name}
                        className="h-10 sm:h-12 w-10 sm:w-12 object-cover rounded-full"
                      />
                    </td>
                    <td className="px-4 sm:px-6 py-4 min-w-[160px]">
                      <div>
                        <div className="font-medium text-sm sm:text-base text-gray-900">{member.name}</div>
                        <div className="text-xs text-gray-500 font-cairo">
                          {member.arabicName}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap min-w-[120px]">
                      <span className="text-xs sm:text-sm text-gray-700">{member.role}</span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 min-w-[140px]">
                      <div className="text-xs sm:text-sm text-gray-900">{member.phone}</div>
                      {member.email && (
                        <div className="text-xs text-gray-500 truncate">{member.email}</div>
                      )}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        member.active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {member.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button
                          onClick={() => handleEdit(member)}
                          className="text-sm px-3 py-1.5 text-indigo-600 hover:bg-indigo-50 rounded transition-colors duration-200 font-medium"
                          title="Edit"
                        >
                          <i className="fas fa-edit sm:hidden"></i>
                          <span className="hidden sm:inline">Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(member.id)}
                          className="text-sm px-3 py-1.5 text-red-600 hover:bg-red-50 rounded transition-colors duration-200 font-medium"
                          title="Delete"
                        >
                          <i className="fas fa-trash sm:hidden"></i>
                          <span className="hidden sm:inline">Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="sm:hidden space-y-3">
            {members.map((member) => (
              <div key={member.id} className="bg-white rounded-lg shadow-md p-4 space-y-3">
                {/* Header with Image and Name */}
                <div className="flex gap-3">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="h-12 w-12 object-cover rounded-full flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900">{member.name}</h3>
                    <p className="text-xs text-gray-500 font-cairo">{member.arabicName}</p>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-xs text-gray-500">Role</p>
                    <p className="font-medium text-gray-900">{member.role}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <a href={`tel:${member.phone}`} className="font-medium text-indigo-600 hover:underline">
                      {member.phone}
                    </a>
                  </div>
                  {member.email && (
                    <div className="col-span-2">
                      <p className="text-xs text-gray-500">Email</p>
                      <a href={`mailto:${member.email}`} className="font-medium text-indigo-600 hover:underline truncate block">
                        {member.email}
                      </a>
                    </div>
                  )}
                  <div className={member.email ? '' : 'col-span-2'}>
                    <p className="text-xs text-gray-500 mb-1">Status</p>
                    <span className={`inline-flex text-xs leading-5 font-semibold rounded-full px-2 py-1 ${
                      member.active 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {member.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2 border-t border-gray-100">
                  <button
                    onClick={() => handleEdit(member)}
                    className="flex-1 py-2 px-3 bg-indigo-50 text-indigo-600 rounded font-medium text-sm hover:bg-indigo-100 transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <i className="fas fa-edit"></i>
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(member.id)}
                    className="flex-1 py-2 px-3 bg-red-50 text-red-600 rounded font-medium text-sm hover:bg-red-100 transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <i className="fas fa-trash"></i>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {members.length > 0 && (
        <div className="mt-4 text-sm text-gray-500 text-center sm:text-left">
          Showing {members.length} team member{members.length !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  )
}

function TeamMemberForm({ member, onSuccess, onCancel }: { member: TeamMember | null, onSuccess: () => void, onCancel: () => void }) {
  const [loading, setLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState(member?.imageUrl || '')
  const [formData, setFormData] = useState({
    name: member?.name || '',
    arabicName: member?.arabicName || '',
    role: member?.role || '',
    phone: member?.phone || '',
    whatsapp: member?.whatsapp || '',
    email: member?.email || '',
    active: member?.active ?? true,
    order: member?.order || 0
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const data = new FormData()
      data.append('name', formData.name)
      data.append('arabicName', formData.arabicName)
      data.append('role', formData.role)
      data.append('phone', formData.phone)
      data.append('whatsapp', formData.whatsapp)
      data.append('email', formData.email)
      data.append('active', formData.active.toString())
      data.append('order', formData.order.toString())
      
      const imageInput = document.getElementById('image') as HTMLInputElement
      if (imageInput?.files?.[0]) {
        data.append('image', imageInput.files[0])
      }

      const url = member 
        ? `/api/admin/team/${member.id}`
        : '/api/admin/team'
      
      const method = member ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        body: data
      })

      if (res.ok) {
        toast.success(member ? 'Team member updated!' : 'Team member created!')
        onSuccess()
      } else {
        throw new Error('Failed to save team member')
      }
    } catch (error) {
      toast.error('Failed to save team member')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white p-6 sm:p-8 rounded-lg shadow mb-8">
      <h2 className="text-xl sm:text-2xl font-bold mb-6">
        {member ? 'Edit Team Member' : 'Add New Team Member'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name (English)
            </label>
            <input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0a5c36] focus:border-[#0a5c36]"
              placeholder="Full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name (Arabic)
            </label>
            <input
              value={formData.arabicName}
              onChange={(e) => setFormData({ ...formData, arabicName: e.target.value })}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0a5c36] focus:border-[#0a5c36] font-cairo text-right"
              placeholder="الاسم بالعربية"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role
            </label>
            <input
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0a5c36] focus:border-[#0a5c36]"
              placeholder="Job title or position"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Order
            </label>
            <input
              type="number"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0a5c36] focus:border-[#0a5c36]"
              placeholder="Display order"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone
            </label>
            <input
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0a5c36] focus:border-[#0a5c36]"
              placeholder="+966 XXXXXXXX"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              WhatsApp
            </label>
            <input
              value={formData.whatsapp}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0a5c36] focus:border-[#0a5c36]"
              placeholder="+966 XXXXXXXX"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email (Optional)
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0a5c36] focus:border-[#0a5c36]"
              placeholder="email@example.com"
            />
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
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0a5c36] focus:border-[#0a5c36]"
          />
          {imagePreview && (
            <div className="mt-4">
              <img
                src={imagePreview}
                alt="Preview"
                className="h-40 sm:h-48 w-auto object-cover rounded-lg"
              />
            </div>
          )}
        </div>

        <div className="flex items-center p-4 bg-gray-50 rounded-lg">
          <input
            type="checkbox"
            id="active"
            checked={formData.active}
            onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
            className="h-4 w-4 text-[#0a5c36] rounded focus:ring-2 focus:ring-[#0a5c36]"
          />
          <label htmlFor="active" className="ml-3 text-sm text-gray-700 font-medium">
            Active (Visible on website)
          </label>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors duration-300"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-6 py-2.5 bg-[#0a5c36] text-white rounded-lg hover:bg-[#084328] font-medium transition-colors duration-300 disabled:opacity-50 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <>
                <i className="fas fa-spinner animate-spin mr-2"></i>
                Saving...
              </>
            ) : (
              <>
                <i className="fas fa-save mr-2"></i>
                {member ? 'Update Member' : 'Create Member'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}





