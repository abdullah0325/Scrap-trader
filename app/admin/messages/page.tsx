'use client'

import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { motion } from 'framer-motion'

interface Message {
  id: string
  name: string
  phone: string
  email?: string | null
  message: string
  materialType?: string | null
  status: 'PENDING' | 'CONTACTED' | 'COMPLETED' | 'SPAM'
  whatsapp?: string | null
  createdAt: string
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'CONTACTED' | 'COMPLETED' | 'SPAM'>('ALL')
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/admin/messages')
      if (res.ok) {
        const data = await res.json()
        setMessages(Array.isArray(data) ? data : [])
      } else {
        toast.error('Failed to fetch messages')
        setMessages([])
      }
    } catch (error) {
      toast.error('Failed to fetch messages')
      setMessages([])
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: string, status: Message['status']) => {
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })

      if (res.ok) {
        toast.success('Status updated')
        fetchMessages()
        setSelectedMessage(null)
      } else {
        toast.error('Failed to update status')
      }
    } catch (error) {
      toast.error('Failed to update status')
    }
  }

  const filteredMessages = filter === 'ALL' 
    ? messages 
    : messages.filter(m => m.status === filter)

  const stats = {
    total: messages.length,
    pending: messages.filter(m => m.status === 'PENDING').length,
    contacted: messages.filter(m => m.status === 'CONTACTED').length,
    completed: messages.filter(m => m.status === 'COMPLETED').length,
    spam: messages.filter(m => m.status === 'SPAM').length
  }

  const getStatusColor = (status: Message['status']) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'CONTACTED': return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'COMPLETED': return 'bg-green-100 text-green-800 border-green-300'
      case 'SPAM': return 'bg-red-100 text-red-800 border-red-300'
    }
  }

  const getStatusIcon = (status: Message['status']) => {
    switch (status) {
      case 'PENDING': return 'fa-hourglass-end'
      case 'CONTACTED': return 'fa-check'
      case 'COMPLETED': return 'fa-check-double'
      case 'SPAM': return 'fa-ban'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <i className="fas fa-spinner animate-spin text-4xl text-[#0a5c36] mb-4"></i>
          <p className="text-gray-600 text-lg">Loading messages...</p>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header */}
      <div className="mb-4 sm:mb-6 md:mb-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold flex items-center mb-2">
          <i className="fas fa-envelope mr-2 sm:mr-3 text-[#0a5c36]"></i>
          Customer Messages
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-gray-600">Manage and respond to customer inquiries</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
        {[
          { label: 'Total', count: stats.total, icon: 'fa-inbox', gradient: 'from-gray-400 to-gray-600' },
          { label: 'Pending', count: stats.pending, icon: 'fa-hourglass-end', gradient: 'from-yellow-400 to-yellow-600' },
          { label: 'Contacted', count: stats.contacted, icon: 'fa-check', gradient: 'from-blue-400 to-blue-600' },
          { label: 'Completed', count: stats.completed, icon: 'fa-check-double', gradient: 'from-green-400 to-green-600' },
          { label: 'Spam', count: stats.spam, icon: 'fa-ban', gradient: 'from-red-400 to-red-600' }
        ].map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-lg shadow-md p-3 sm:p-4 md:p-6 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <p className="text-xs sm:text-sm md:text-base text-gray-600 font-semibold truncate">{stat.label}</p>
              <div className={`bg-gradient-to-br ${stat.gradient} p-2 sm:p-3 rounded-lg flex-shrink-0`}>
                <i className={`fas ${stat.icon} text-white text-base sm:text-lg`}></i>
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-gray-800">{stat.count}</p>
          </motion.div>
        ))}
      </div>

      {/* Filter Buttons */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {(['ALL', 'PENDING', 'CONTACTED', 'COMPLETED', 'SPAM'] as const).map((status) => (
            <motion.button
              key={status}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(status)}
              className={`px-3 sm:px-6 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center space-x-1 sm:space-x-2 ${
                filter === status
                  ? 'bg-gradient-to-r from-primary to-primary-dark text-white shadow-lg'
                  : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-[#0a5c36]'
              }`}
            >
              <i className={`fas ${
                status === 'ALL' ? 'fa-list' :
                status === 'PENDING' ? 'fa-hourglass-end' :
                status === 'CONTACTED' ? 'fa-check' :
                status === 'COMPLETED' ? 'fa-check-double' :
                'fa-ban'
              }`}></i>
              <span className="hidden sm:inline">{status}</span>
              <span className="inline sm:hidden">{status.slice(0, 3)}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Messages List */}
      <div className="space-y-3 sm:space-y-4">
        {filteredMessages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-lg shadow-md p-6 sm:p-12 text-center"
          >
            <i className="fas fa-inbox text-3xl sm:text-4xl text-gray-300 mb-4"></i>
            <p className="text-gray-500 text-sm sm:text-lg">No messages found for this filter</p>
          </motion.div>
        ) : (
          filteredMessages.map((message, idx) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setSelectedMessage(message)}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 border-[#0a5c36] hover:border-accent p-4 sm:p-6"
            >
              <div className="space-y-4">
                {/* Header: Name and Status Row */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-base sm:text-lg text-gray-800">{message.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                      {new Date(message.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`inline-flex items-center space-x-1 px-2 sm:px-3 py-1 rounded-full text-xs font-bold border-2 flex-shrink-0 ${getStatusColor(message.status)}`}>
                    <i className={`fas ${getStatusIcon(message.status)}`}></i>
                    <span className="hidden sm:inline">{message.status}</span>
                    <span className="inline sm:hidden">{message.status.slice(0, 3)}</span>
                  </span>
                </div>

                {/* Contact Information */}
                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="text-gray-600 flex items-center flex-wrap gap-2">
                    <i className="fas fa-phone text-[#0a5c36] flex-shrink-0"></i>
                    <a href={`tel:${message.phone}`} className="hover:text-[#0a5c36] font-medium break-all">
                      {message.phone}
                    </a>
                  </div>
                  {message.email && (
                    <div className="text-gray-600 flex items-center flex-wrap gap-2">
                      <i className="fas fa-envelope text-[#0a5c36] flex-shrink-0"></i>
                      <a href={`mailto:${message.email}`} className="hover:text-[#0a5c36] truncate font-medium">
                        {message.email}
                      </a>
                    </div>
                  )}
                  {message.whatsapp && (
                    <div className="flex items-center gap-2">
                      <a
                        href={`https://wa.me/${message.whatsapp.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-700 text-xs sm:text-sm flex items-center font-medium"
                      >
                        <i className="fab fa-whatsapp mr-1"></i>
                        WhatsApp
                      </a>
                    </div>
                  )}
                </div>

                {/* Message */}
                <div>
                  <p className="text-gray-700 text-xs sm:text-sm line-clamp-3">{message.message}</p>
                </div>

                {/* Material Type Badge */}
                {message.materialType && (
                  <div>
                    <span className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 bg-[#0a5c36]/20 text-[#0a5c36] rounded-full text-xs font-semibold">
                      <i className="fas fa-cube"></i>
                      {message.materialType}
                    </span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2 border-t border-gray-100">
                  <a
                    href={`tel:${message.phone}`}
                    className="flex-1 py-2 px-3 bg-blue-50 text-blue-600 rounded font-medium text-xs sm:text-sm hover:bg-blue-100 transition-colors duration-200 flex items-center justify-center gap-2"
                    title="Call"
                  >
                    <i className="fas fa-phone"></i>
                    <span className="hidden sm:inline">Call</span>
                  </a>
                  {message.whatsapp && (
                    <a
                      href={`https://wa.me/${message.whatsapp.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 px-3 bg-green-50 text-green-600 rounded font-medium text-xs sm:text-sm hover:bg-green-100 transition-colors duration-200 flex items-center justify-center gap-2"
                      title="WhatsApp"
                    >
                      <i className="fab fa-whatsapp"></i>
                      <span className="hidden sm:inline">WhatsApp</span>
                    </a>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedMessage(message)
                    }}
                    className="flex-1 py-2 px-3 bg-[#0a5c36]/10 text-[#0a5c36] rounded font-medium text-xs sm:text-sm hover:bg-[#0a5c36]/20 transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <i className="fas fa-expand"></i>
                    <span className="hidden sm:inline">Details</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Detail Modal */}
      {selectedMessage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedMessage(null)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-96 overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-primary to-primary-dark text-white p-6 sticky top-0">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold">{selectedMessage.name}</h2>
                  <p className="text-[#0a5c36]-light text-sm">Message from {new Date(selectedMessage.createdAt).toLocaleDateString()}</p>
                </div>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors duration-300"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Contact Information */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Phone</p>
                  <a href={`tel:${selectedMessage.phone}`} className="text-[#0a5c36] hover:text-[#0a5c36]-dark font-semibold flex items-center">
                    <i className="fas fa-phone mr-2"></i>
                    {selectedMessage.phone}
                  </a>
                </div>
                {selectedMessage.email && (
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Email</p>
                    <a href={`mailto:${selectedMessage.email}`} className="text-[#0a5c36] hover:text-[#0a5c36]-dark font-semibold truncate flex items-center">
                      <i className="fas fa-envelope mr-2"></i>
                      {selectedMessage.email}
                    </a>
                  </div>
                )}
              </div>

              {/* Message */}
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold mb-2">Message</p>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="text-gray-800 leading-relaxed">{selectedMessage.message}</p>
                </div>
              </div>

              {/* Material Type */}
              {selectedMessage.materialType && (
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold mb-2">Interested Material</p>
                  <span className="inline-block px-4 py-2 bg-[#0a5c36]/20 text-[#0a5c36] rounded-lg font-semibold">
                    <i className="fas fa-cube mr-2"></i>
                    {selectedMessage.materialType}
                  </span>
                </div>
              )}

              {/* Status Update */}
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold mb-3">Update Status</p>
                <div className="grid grid-cols-2 gap-2">
                  {(['PENDING', 'CONTACTED', 'COMPLETED', 'SPAM'] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() => updateStatus(selectedMessage.id, status)}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                        selectedMessage.status === status
                          ? 'bg-gradient-to-r from-primary to-primary-dark text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <i className={`fas ${getStatusIcon(status)}`}></i>
                      <span>{status}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex space-x-3 pt-4 border-t">
                <a
                  href={`tel:${selectedMessage.phone}`}
                  className="flex-1 px-4 py-3 bg-blue-100 text-blue-600 rounded-lg font-semibold hover:bg-blue-200 transition-colors duration-300 flex items-center justify-center space-x-2"
                >
                  <i className="fas fa-phone"></i>
                  <span>Call</span>
                </a>
                {selectedMessage.whatsapp && (
                  <a
                    href={`https://wa.me/${selectedMessage.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-3 bg-green-100 text-green-600 rounded-lg font-semibold hover:bg-green-200 transition-colors duration-300 flex items-center justify-center space-x-2"
                  >
                    <i className="fab fa-whatsapp"></i>
                    <span>WhatsApp</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}





