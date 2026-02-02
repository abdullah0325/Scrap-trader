'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

interface Stats {
  totalMessages: number
  pendingMessages: number
  totalMaterials: number
  totalServices: number
}

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState<Stats>({
    totalMessages: 0,
    pendingMessages: 0,
    totalMaterials: 0,
    totalServices: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
    
    if (status === 'authenticated') {
      fetchStats()
    }
  }, [status, router])

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/admin/stats')
      const data = await res.json()
      setStats(data)
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const quickActions = [
    {
      title: 'Manage Materials',
      description: 'Add, edit, or delete materials',
      icon: 'fa-boxes',
      link: '/admin/materials',
      color: 'from-[#0a5c36] to-[#084328]'
    },
    {
      title: 'Manage Services',
      description: 'Update your services',
      icon: 'fa-cog',
      link: '/admin/services',
      color: 'from-[#0a5c36] to-[#084328]'
    },
    {
      title: 'View Messages',
      description: 'Check customer inquiries',
      icon: 'fa-envelope',
      link: '/admin/messages',
      color: 'from-[#0a5c36] to-[#084328]'
    },
    {
      title: 'Edit Hero Slides',
      description: 'Update homepage slides',
      icon: 'fa-images',
      link: '/admin/hero',
      color: 'from-[#0a5c36] to-[#084328]'
    },
  ]

  const statCards = [
    {
      label: 'Total Messages',
      value: stats.totalMessages,
      icon: 'fa-envelope',
      color: 'from-[#0a5c36] to-[#084328]',
      bgColor: 'bg-[#e8f5f0]'
    },
    {
      label: 'Pending Messages',
      value: stats.pendingMessages,
      icon: 'fa-clock',
      color: 'from-[#0a5c36] to-[#084328]',
      bgColor: 'bg-[#e8f5f0]'
    },
    {
      label: 'Materials',
      value: stats.totalMaterials,
      icon: 'fa-boxes',
      color: 'from-[#0a5c36] to-[#084328]',
      bgColor: 'bg-[#e8f5f0]'
    },
    {
      label: 'Services',
      value: stats.totalServices,
      icon: 'fa-cog',
      color: 'from-[#0a5c36] to-[#084328]',
      bgColor: 'bg-[#e8f5f0]'
    },
  ]

  if (status === 'loading' || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin mb-4">
            <i className="fas fa-spinner text-4xl text-[#0a5c36]"></i>
          </div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-sm sm:text-base text-gray-600">Welcome back, {session?.user?.name || 'Admin'}!</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, staggerChildren: 0.1 }}
      >
        {statCards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`${card.bgColor} rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 border-2 border-[#0a5c36]/20 hover:border-[#0a5c36]/50 hover:shadow-xl transition-all duration-300`}
          >
            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-2 sm:gap-0">
              <div className="text-center sm:text-left w-full">
                <p className="text-[#0a5c36] text-xs sm:text-sm font-semibold mb-1 sm:mb-2 line-clamp-2">{card.label}</p>
                <p className={`text-2xl sm:text-3xl md:text-4xl font-bold text-[#0a5c36]`}>
                  {card.value}
                </p>
              </div>
              <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br ${card.color} flex-shrink-0 flex items-center justify-center text-white text-lg sm:text-2xl shadow-lg`}>
                <i className={`fas ${card.icon}`}></i>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {quickActions.map((action, index) => (
            <motion.button
              key={index}
              onClick={() => router.push(action.link)}
              whileHover={{ translateY: -5 }}
              whileTap={{ scale: 0.98 }}
              className={`bg-gradient-to-br ${action.color} text-white rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 group text-left flex flex-col`}
            >
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white/20 flex items-center justify-center text-xl sm:text-2xl mb-2 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <i className={`fas ${action.icon}`}></i>
              </div>
              <h3 className="font-bold text-sm sm:text-base md:text-lg mb-1 sm:mb-2 line-clamp-2">{action.title}</h3>
              <p className="text-xs sm:text-sm opacity-90 mb-2 line-clamp-2">{action.description}</p>
              <div className="mt-auto flex items-center text-xs sm:text-sm font-semibold group-hover:translate-x-2 transition-transform duration-300">
                <i className="fas fa-arrow-right"></i>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Info Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6"
      >
        {/* Pending Messages Alert */}
        {stats.pendingMessages > 0 && (
          <div className="bg-[#e8f5f0] border-l-4 border-[#0a5c36] p-4 sm:p-6 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <i className="fas fa-exclamation-circle text-[#0a5c36] text-xl sm:text-2xl"></i>
              </div>
              <div className="min-w-0">
                <h3 className="text-sm sm:text-lg font-semibold text-[#0a5c36]">
                  {stats.pendingMessages} Pending Message{stats.pendingMessages !== 1 ? 's' : ''}
                </h3>
                <p className="text-xs sm:text-sm text-[#0a5c36]/80 mt-1 sm:mt-2">
                  You have unresponded customer inquiries that need attention.
                </p>
                <button
                  onClick={() => router.push('/admin/messages')}
                  className="mt-3 sm:mt-4 inline-flex items-center px-3 sm:px-4 py-2 bg-[#0a5c36] text-white text-xs sm:text-sm rounded-lg font-semibold hover:bg-[#084328] transition-colors duration-300"
                >
                  View Messages
                  <i className="fas fa-arrow-right ml-2"></i>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Quick Tips */}
        <div className="bg-[#e8f5f0] border-l-4 border-[#0a5c36] p-4 sm:p-6 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <i className="fas fa-lightbulb text-[#0a5c36] text-xl sm:text-2xl"></i>
            </div>
            <div>
              <h3 className="text-sm sm:text-lg font-semibold text-[#0a5c36]">
                Pro Tip
              </h3>
              <p className="text-xs sm:text-sm text-[#0a5c36]/80 mt-1 sm:mt-2">
                Keep your materials and services information up-to-date to attract more customers and improve your search rankings.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}