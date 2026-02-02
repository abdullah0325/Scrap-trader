'use client'

import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function AdminSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const menuItems = [
    { href: '/admin', label: 'Dashboard', icon: 'fa-chart-line' },
    { href: '/admin/hero', label: 'Hero Slides', icon: 'fa-images' },
    { href: '/admin/materials', label: 'Materials', icon: 'fa-boxes' },
    { href: '/admin/services', label: 'Services', icon: 'fa-cog' },
    { href: '/admin/team', label: 'Team', icon: 'fa-users' },
    { href: '/admin/messages', label: 'Messages', icon: 'fa-envelope' },
  ]

  const handleNavClick = () => {
    if (isMobile) {
      setIsOpen(false)
    }
  }

  return (
    <>
      {/* Mobile Header Button */}
      {isMobile && (
        <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center px-4 z-40 shadow-sm">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-center w-10 h-10 text-gray-700 hover:text-[#0a5c36] hover:bg-gray-100 rounded-lg transition-all duration-300"
            aria-label="Toggle sidebar"
          >
            <i className={`fas transition-transform duration-300 ${isOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
          <div className="ml-4 flex items-center space-x-3">
            <div className="relative w-8 h-8 flex-shrink-0">
              <Image
                src="/logo.png"
                alt="Admin Panel"
                fill
                className="object-contain"
              />
            </div>
            <h2 className="text-sm font-bold text-[#0a5c36]">Admin Panel</h2>
          </div>
        </div>
      )}

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar - Desktop fixed, Mobile drawer */}
      <aside
        className={`${
          isMobile
            ? `fixed left-0 top-0 h-screen w-64 bg-white text-gray-800 shadow-2xl border-r border-gray-200 transform transition-transform duration-300 z-40 ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
              }`
            : 'hidden lg:flex lg:fixed lg:left-0 lg:top-0 lg:w-64 lg:h-screen lg:bg-white lg:text-gray-800 lg:shadow-xl lg:border-r lg:border-gray-200 lg:flex-col'
        }`}
      >
        {/* Logo Section */}
        <div className={`${isMobile ? 'pt-20' : ''} p-6 border-b border-gray-200`}>
          <div className="flex items-center space-x-3 mb-2">
            <div className="relative w-10 h-10 flex-shrink-0">
              <Image
                src="/logo.png"
                alt="Saudi Scrap Trader - تاجر الخردة السعودي"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#0a5c36]">Admin Panel</h2>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-8 px-3 flex-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                className={`flex items-center px-4 py-3 mb-2 text-sm font-semibold rounded-lg transition-all duration-300 ${
                  isActive
                    ? 'bg-[#0a5c36]/10 text-[#0a5c36] shadow-md border-l-4 border-[#0a5c36]'
                    : 'text-gray-700 hover:text-[#0a5c36] hover:bg-[#0a5c36]/5'
                }`}
              >
                <i className={`fas ${item.icon} w-5 mr-3`}></i>
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="w-full flex items-center justify-center px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-sm"
          >
            <i className="fas fa-sign-out-alt mr-2"></i>
            Logout
          </button>
        </div>
      </aside>

      {/* Content offset for desktop */}
      {!isMobile && <div className="hidden lg:block lg:w-64 lg:flex-shrink-0" />}
    </>
  )
}