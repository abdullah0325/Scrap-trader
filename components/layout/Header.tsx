// 'use client'

// import { useState, useEffect } from 'react'
// import Link from 'next/link'
// import Image from 'next/image'
// import { useSession, signOut } from 'next-auth/react'

// export default function Header() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false)
//   const [isScrolled, setIsScrolled] = useState(false)
//   const { data: session } = useSession()

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10)
//     }
//     window.addEventListener('scroll', handleScroll)
//     return () => window.removeEventListener('scroll', handleScroll)
//   }, [])

//   const menuItems = [
//     { href: '/', label: 'Home' },
//     { href: '/about', label: 'About' },
//     { href: '/#materials', label: 'Materials' },
//     { href: '/#services', label: 'Services' },
//     { href: '/#team', label: 'Team' },
//     { href: '/#contact', label: 'Contact' },
//   ]

//   return (
//     <header className={`sticky top-0 z-50 transition-all duration-300 ${
//       isScrolled ? 'bg-white shadow-lg' : 'bg-white shadow-md'
//     }`}>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-20">
//           {/* Logo */}
//           <Link href="/" className="flex items-center space-x-3 group">
//             <div className="relative w-12 h-12 flex-shrink-0">
//               <Image
//                 src="/logo.png"
//                 alt="Saudi Scrap Trader - تاجر الخردة السعودي"
//                 fill
//                 className="object-contain"
//                 priority
//               />
//             </div>
//             <div className="hidden sm:block">
//               <h1 className="text-lg font-bold text-primary group-hover:text-primary-dark transition-colors">
//                 Saudi Scrap Trader
//               </h1>
//             </div>
//           </Link>

//           {/* Desktop Menu */}
//           <nav className="hidden md:flex items-center space-x-1">
//             {menuItems.map((item) => {
//               if (item.href.startsWith('#')) {
//                 return (
//                   <a
//                     key={item.href}
//                     href={item.href}
//                     className="px-4 py-2 text-gray-700 hover:text-primary transition-colors font-medium text-sm"
//                   >
//                     {item.label}
//                   </a>
//                 )
//               }
//               return (
//                 <Link
//                   key={item.href}
//                   href={item.href}
//                   className="px-4 py-2 text-gray-700 hover:text-primary transition-colors font-medium text-sm"
//                 >
//                   {item.label}
//                 </Link>
//               )
//             })}
//           </nav>

//           {/* Right Side Actions */}
//           <div className="flex items-center space-x-4">
//             {session?.user?.role === 'ADMIN' && (
//               <Link
//                 href="/admin"
//                 className="hidden sm:inline-flex items-center px-4 py-2 text-primary font-semibold hover:bg-primary hover:text-white rounded-lg transition-all duration-300"
//               >
//                 <i className="fas fa-tachometer-alt mr-2"></i>
//                 Admin
//               </Link>
//             )}

//             {session ? (
//               <button
//                 onClick={() => signOut({ callbackUrl: '/' })}
//                 className="hidden sm:inline-flex items-center px-4 py-2 bg-red-500 text-white font-semibold hover:bg-red-600 rounded-lg transition-all duration-300"
//               >
//                 <i className="fas fa-sign-out-alt mr-2"></i>
//                 Logout
//               </button>
//             ) : null}

//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="md:hidden inline-flex items-center justify-center w-10 h-10 text-gray-700 hover:text-primary rounded-lg hover:bg-gray-100 transition-all duration-300"
//               aria-label="Toggle menu"
//             >
//               <i className={`fas transition-transform duration-300 ${
//                 isMenuOpen ? 'fa-times text-xl' : 'fa-bars text-xl'
//               }`}></i>
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {isMenuOpen && (
//           <nav className="md:hidden pb-4 border-t border-gray-200 animate-fadeInUp">
//             {menuItems.map((item) => {
//               if (item.href.startsWith('#')) {
//                 return (
//                   <a
//                     key={item.href}
//                     href={item.href}
//                     onClick={() => setIsMenuOpen(false)}
//                     className="block px-4 py-3 text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors rounded-lg font-medium"
//                   >
//                     {item.label}
//                   </a>
//                 )
//               }
//               return (
//                 <Link
//                   key={item.href}
//                   href={item.href}
//                   onClick={() => setIsMenuOpen(false)}
//                   className="block px-4 py-3 text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors rounded-lg font-medium"
//                 >
//                   {item.label}
//                 </Link>
//               )
//             })}
//             {session?.user?.role === 'ADMIN' && (
//               <Link
//                 href="/admin"
//                 onClick={() => setIsMenuOpen(false)}
//                 className="block px-4 py-3 text-primary font-semibold hover:bg-primary hover:text-white transition-all duration-300 rounded-lg mt-2"
//               >
//                 <i className="fas fa-tachometer-alt mr-2"></i>
//                 Admin Panel
//               </Link>
//             )}
//             {session && (
//               <button
//                 onClick={() => {
//                   setIsMenuOpen(false)
//                   signOut({ callbackUrl: '/' })
//                 }}
//                 className="w-full text-left px-4 py-3 text-red-500 font-semibold hover:bg-red-50 transition-all duration-300 rounded-lg mt-2"
//               >
//                 <i className="fas fa-sign-out-alt mr-2"></i>
//                 Logout
//               </button>
//             )}
//           </nav>
//         )}
//       </div>
//     </header>
//   )
// }





'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'
import GoogleTranslate from '@/components/layout/GoogleTranslate'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { data: session } = useSession()

  // Phone numbers from your business cards
  const contactNumbers = {
    amjad: '0531901277', // Amjad Khan - English card
    amir: '0531970403',  // Amir Khan - Urdu/Arabic card (assuming same person)
    baroz: '0583954403', // Baroz - English card
  }

  const whatsappNumber = '966583954403' // Using Baroz's number for WhatsApp
  const whatsappMessage = encodeURIComponent('Hello Saudi Scrap Trader, I would like to inquire about your scrap services.')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const menuItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/#materials', label: 'Materials' },
    { href: '/#services', label: 'Services' },
    { href: '/#team', label: 'Team' },
    { href: '/#contact', label: 'Contact' },
  ]

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-gradient-to-r from-gray-50 to-white shadow-lg backdrop-blur-sm bg-white/95' 
        : 'bg-gradient-to-r from-gray-50 to-white shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-12 h-12 flex-shrink-0 bg-white p-2 rounded-lg border border-gray-100 shadow-sm">
              <Image
                src="/logo.png"
                alt="Saudi Scrap Trader - تاجر الخردة السعودي"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-gray-800 group-hover:text-[#2c3e50] transition-colors">
                Saudi Scrap Trader
              </h1>
              
            </div>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => {
              if (item.href.startsWith('#')) {
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className="px-5 py-2 text-gray-700 hover:text-[#b87333] transition-colors font-medium text-sm relative group hover:bg-white/50 rounded-lg"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-[#b87333] group-hover:w-3/4 transition-all duration-300"></span>
                  </a>
                )
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-5 py-2 text-gray-700 hover:text-[#b87333] transition-colors font-medium text-sm relative group hover:bg-white/50 rounded-lg"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-[#b87333] group-hover:w-3/4 transition-all duration-300"></span>
                </Link>
              )
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* WhatsApp Button - Green */}
            <a 
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center px-4 py-2.5 bg-[#25D366] text-white font-semibold rounded-lg hover:bg-[#1da851] transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02]"
            >
              <i className="fab fa-whatsapp mr-2 text-lg"></i>
              <span className="text-sm">WhatsApp</span>
            </a>

            {/* Call Button - Blue */}
            <a 
              href={`tel:+966${contactNumbers.amjad}`} 
              className="hidden lg:flex items-center px-4 py-2.5 bg-gradient-to-r from-[#2c3e50] to-[#4a5568] text-white font-semibold rounded-lg hover:from-[#1a252f] hover:to-[#2d3748] transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02]"
            >
              <i className="fas fa-phone-alt mr-2 text-sm"></i>
              <span className="text-sm">Call Now</span>
            </a>

            {/* Combined Contact Dropdown for mobile/tablet */}
            <div className="hidden md:flex lg:hidden relative group">
              <button className="flex items-center px-4 py-2.5 bg-gradient-to-r from-[#2c3e50] to-[#4a5568] text-white font-semibold rounded-lg hover:from-[#1a252f] hover:to-[#2d3748] transition-all duration-300 shadow-md">
                <i className="fas fa-phone-alt mr-2"></i>
                <span className="text-sm">Contact</span>
                <i className="fas fa-chevron-down ml-2 text-xs"></i>
              </button>
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <a 
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors rounded-t-lg border-b border-gray-100"
                >
                  <i className="fab fa-whatsapp mr-3 text-green-500 text-lg"></i>
                  <span>WhatsApp</span>
                </a>
                <a 
                  href={`tel:+966${contactNumbers.amjad}`}
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors rounded-b-lg"
                >
                  <i className="fas fa-phone-alt mr-3 text-blue-500"></i>
                  <span>Call Now</span>
                </a>
              </div>
            </div>

           
            

            {/* Language selector */}
            <div className="inline-flex items-center">
              <GoogleTranslate />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden inline-flex items-center justify-center w-10 h-10 text-gray-700 hover:text-[#b87333] rounded-lg hover:bg-white transition-all duration-300 border border-gray-200 shadow-sm"
              aria-label="Toggle menu"
            >
              <i className={`fas transition-transform duration-300 ${
                isMenuOpen ? 'fa-times text-lg' : 'fa-bars text-lg'
              }`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 animate-fadeInUp">
            <div className="border-t border-gray-200 pt-4 bg-white/80 backdrop-blur-sm rounded-xl p-2 mt-2 shadow-sm">
              {menuItems.map((item) => {
                if (item.href.startsWith('#')) {
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center px-4 py-3 text-gray-700 hover:text-[#b87333] hover:bg-gray-50 transition-colors rounded-lg font-medium group"
                    >
                      <i className="fas fa-chevron-right text-xs text-gray-400 mr-3 group-hover:text-[#b87333]"></i>
                      {item.label}
                    </a>
                  )
                }
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center px-4 py-3 text-gray-700 hover:text-[#b87333] hover:bg-gray-50 transition-colors rounded-lg font-medium group"
                  >
                    <i className="fas fa-chevron-right text-xs text-gray-400 mr-3 group-hover:text-[#b87333]"></i>
                    {item.label}
                  </Link>
                )
              })}
              
              {/* Mobile Contact Buttons */}
              <div className="mt-4 grid grid-cols-2 gap-2">
                {/* WhatsApp Button */}
                <a 
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex flex-col items-center justify-center px-4 py-3 bg-gradient-to-r from-[#25D366] to-[#1da851] text-white font-semibold rounded-lg hover:from-[#1da851] hover:to-[#25D366] transition-all duration-300 shadow-md"
                >
                  <i className="fab fa-whatsapp text-xl mb-1"></i>
                  <span className="text-xs">WhatsApp</span>
                </a>

                {/* Call Button */}
                <a 
                  href={`tel:+966${contactNumbers.amjad}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex flex-col items-center justify-center px-4 py-3 bg-gradient-to-r from-[#2c3e50] to-[#4a5568] text-white font-semibold rounded-lg hover:from-[#1a252f] hover:to-[#2d3748] transition-all duration-300 shadow-md"
                >
                  <i className="fas fa-phone-alt text-lg mb-1"></i>
                  <span className="text-xs">Call Now</span>
                </a>
              </div>

              {/* Additional Contact Info */}
              <div className="mt-3 p-3 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-100 shadow-sm">
                <p className="text-xs text-gray-600 mb-2 font-medium flex items-center">
                  <i className="fas fa-address-card mr-2 text-[#b87333]"></i>
                  Contact Numbers:
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-700 font-medium">Amjad Khan:</span>
                    <a href={`tel:+966${contactNumbers.amjad}`} className="text-xs text-[#b87333] font-semibold hover:text-[#2c3e50]">
                      0{contactNumbers.amjad}
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-700 font-medium">Baroz:</span>
                    <a href={`tel:+966${contactNumbers.baroz}`} className="text-xs text-[#b87333] font-semibold hover:text-[#2c3e50]">
                      0{contactNumbers.baroz}
                    </a>
                  </div>
                </div>
              </div>

             
            </div>
          </div>
        )}
      </div>
    </header>
  )
}