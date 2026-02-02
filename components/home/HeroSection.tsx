// 'use client'

// import { useState, useEffect } from 'react'
// import Image from 'next/image'
// import { motion, AnimatePresence } from 'framer-motion'

// interface HeroSlide {
//   id: string
//   title: string
//   arabicTitle: string
//   description: string
//   imageUrl: string
//   buttonText?: string | null
//   buttonLink?: string | null
// }

// interface HeroSectionProps {
//   slides: HeroSlide[]
// }

// export default function HeroSection({ slides }: HeroSectionProps) {
//   const [currentIndex, setCurrentIndex] = useState(0)
//   const [isAutoPlaying, setIsAutoPlaying] = useState(true)
//   const [imageError, setImageError] = useState(false)

//   useEffect(() => {
//     if (slides.length === 0) return
//     if (!isAutoPlaying) return

//     const interval = setInterval(() => {
//       setCurrentIndex((prev) => (prev + 1) % slides.length)
//     }, 5000)

//     return () => clearInterval(interval)
//   }, [slides.length, isAutoPlaying])

//   useEffect(() => {
//     setImageError(false)
//   }, [currentIndex])

//   const goToSlide = (index: number) => {
//     setCurrentIndex(index)
//     setIsAutoPlaying(false)
//   }

//   const nextSlide = () => {
//     setCurrentIndex((prev) => (prev + 1) % slides.length)
//     setIsAutoPlaying(false)
//   }

//   const prevSlide = () => {
//     setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)
//     setIsAutoPlaying(false)
//   }

//   if (slides.length === 0) {
//     return (
//       <section id="home" className="relative min-h-screen bg-gradient-to-br from-primary via-primary-dark to-accent flex items-center justify-center overflow-hidden pt-20">
//         <div className="absolute inset-0 opacity-20">
//           <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
//           <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
//         </div>
        
//         <div className="relative z-10 text-center text-white px-4">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//           >
//             <h1 className="text-5xl md:text-7xl font-bold mb-4">Saudi Scrap Trader</h1>
//             <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
//               Your trusted partner for scrap trading services in Saudi Arabia
//             </p>
//           </motion.div>
//         </div>
//       </section>
//     )
//   }

//   const currentSlide = slides[currentIndex]

//   return (
//     <section
//       id="home"
//       className="relative min-h-screen overflow-hidden pt-20"
//       onMouseEnter={() => setIsAutoPlaying(false)}
//       onMouseLeave={() => setIsAutoPlaying(true)}
//     >
//       <AnimatePresence mode="wait">
//         <motion.div
//           key={currentIndex}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.7 }}
//           className="absolute inset-0"
//         >
//           <div className="relative w-full h-full">
//             {currentSlide.imageUrl && !imageError ? (
//               <Image
//                 src={currentSlide.imageUrl}
//                 alt={currentSlide.title}
//                 fill
//                 className="object-cover"
//                 priority={currentIndex === 0}
//                 unoptimized
//                 onError={() => {
//                   console.error('Image load error:', currentSlide.imageUrl)
//                   setImageError(true)
//                 }}
//               />
//             ) : (
//               <div className="w-full h-full bg-gradient-to-br from-primary via-primary-dark to-accent"></div>
//             )}
//             <div className="absolute inset-0 bg-black/50"></div>
//             <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>
//           </div>
//         </motion.div>
//       </AnimatePresence>

//       {/* Content */}
//       <div className="relative z-10 h-full flex items-center justify-center min-h-[calc(100vh-80px)]">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white py-24 md:py-32 lg:py-40">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={currentIndex}
//               initial={{ y: 30, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               exit={{ y: -30, opacity: 0 }}
//               transition={{ duration: 0.6 }}
//               className="max-w-3xl mx-auto"
//             >
//               <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
//                 {currentSlide.title}
//               </h1>
//               <p className="text-lg md:text-xl mb-10 opacity-90 max-w-2xl mx-auto leading-relaxed">
//                 {currentSlide.description}
//               </p>
//               {currentSlide.buttonText && currentSlide.buttonLink && (
//                 <a
//                   href={currentSlide.buttonLink}
//                   className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-bold text-lg group"
//                 >
//                   {currentSlide.buttonText}
//                   <i className="fas fa-arrow-right ml-3 group-hover:translate-x-1 transition-transform duration-300"></i>
//                 </a>
//               )}
//             </motion.div>
//           </AnimatePresence>
//         </div>
//       </div>

//       {/* Navigation Dots */}
//       {slides.length > 1 && (
//         <motion.div
//           className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.5 }}
//         >
//           {slides.map((_, index) => (
//             <motion.button
//               key={index}
//               onClick={() => goToSlide(index)}
//               whileHover={{ scale: 1.2 }}
//               whileTap={{ scale: 0.9 }}
//               className={`transition-all duration-300 ${
//                 index === currentIndex
//                   ? 'bg-white w-10 h-3 rounded-full'
//                   : 'bg-white/50 w-3 h-3 rounded-full hover:bg-white/75'
//               }`}
//               aria-label={`Go to slide ${index + 1}`}
//             />
//           ))}
//         </motion.div>
//       )}

//       {/* Navigation Arrows */}
//       {slides.length > 1 && (
//         <>
//           <motion.button
//             onClick={prevSlide}
//             whileHover={{ scale: 1.1, x: -5 }}
//             whileTap={{ scale: 0.95 }}
//             className="absolute left-6 md:left-10 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-4 rounded-full transition-all duration-300 group"
//             aria-label="Previous slide"
//           >
//             <i className="fas fa-chevron-left text-2xl group-hover:scale-125 transition-transform duration-300"></i>
//           </motion.button>
//           <motion.button
//             onClick={nextSlide}
//             whileHover={{ scale: 1.1, x: 5 }}
//             whileTap={{ scale: 0.95 }}
//             className="absolute right-6 md:right-10 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-4 rounded-full transition-all duration-300 group"
//             aria-label="Next slide"
//           >
//             <i className="fas fa-chevron-right text-2xl group-hover:scale-125 transition-transform duration-300"></i>
//           </motion.button>
//         </>
//       )}

//       {/* Scroll Indicator */}
//       <motion.div
//         className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-20 mb-4"
//         animate={{ y: [0, 10, 0] }}
//         transition={{ duration: 2, repeat: Infinity }}
//       >
//         <div className="text-white text-center">
//           <p className="text-sm mb-2 opacity-75">Scroll to explore</p>
//           <i className="fas fa-chevron-down text-2xl opacity-75"></i>
//         </div>
//       </motion.div>
//     </section>
//   )
// }

'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isHovering, setIsHovering] = useState(false)
  const slideInterval = useRef<NodeJS.Timeout | null>(null)
  
  // Contact information
  const whatsappNumber = '966583954403'
  const phoneNumber = '0531901277'
  const whatsappMessage = encodeURIComponent('Hello Saudi Scrap Trader, I would like to inquire about your scrap services.')
  
  // Your hero images from public folder - WhatsApp Images
  const heroImages = [
    { src: '/WhatsApp Image 2026-01-14 at 3.17.47 PM.jpeg', title: 'Premium Scrap Trading', desc: 'Your trusted partner in scrap metal recycling' },
    { src: '/WhatsApp Image 2026-01-14 at 3.17.48 PM (1).jpeg', title: 'Instant Cash Payment', desc: 'Get immediate payment for your scrap materials' },
    { src: '/WhatsApp Image 2026-01-14 at 3.17.48 PM (2).jpeg', title: 'Free Pickup Service', desc: 'We collect scrap from your location free of charge' },
    { src: '/WhatsApp Image 2026-01-14 at 3.17.48 PM.jpeg', title: 'All Types Accepted', desc: 'Iron, Copper, Aluminum, Steel & Industrial Waste' },
    { src: '/WhatsApp Image 2026-01-14 at 3.17.49 PM (1).jpeg', title: 'Best Market Prices', desc: 'Competitive rates for all scrap materials' },
    { src: '/WhatsApp Image 2026-01-14 at 3.17.49 PM.jpeg', title: 'Eco-Friendly Recycling', desc: 'Responsible scrap processing for a cleaner environment' },
    { src: '/WhatsApp Image 2026-01-14 at 3.17.50 PM.jpeg', title: 'Professional Service', desc: 'Expert team ready to assist you anytime' },
  ]

  // Auto slide functionality
  const startSlideShow = () => {
    if (slideInterval.current) clearInterval(slideInterval.current)
    
    slideInterval.current = setInterval(() => {
      if (!isHovering) {
        setCurrentSlide(prev => (prev + 1) % heroImages.length)
      }
    }, 5000)
  }

  const stopSlideShow = () => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current)
      slideInterval.current = null
    }
  }

  useEffect(() => {
    startSlideShow()
    return () => stopSlideShow()
  }, [isHovering])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsHovering(true)
    setTimeout(() => setIsHovering(false), 3000)
  }

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % heroImages.length)
    setIsHovering(true)
    setTimeout(() => setIsHovering(false), 3000)
  }

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + heroImages.length) % heroImages.length)
    setIsHovering(true)
    setTimeout(() => setIsHovering(false), 3000)
  }

  // Handle image load
  const handleImageLoad = () => {
    setIsLoading(false)
  }

  return (
    <section 
      className="relative h-screen overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Background Slideshow */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            {/* Loading Skeleton */}
            {isLoading && (
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 animate-pulse"></div>
            )}
            
            {/* Background Image */}
            <Image
              src={heroImages[currentSlide].src}
              alt={heroImages[currentSlide].title}
              fill
              className="object-cover"
              priority
              quality={90}
              onLoad={handleImageLoad}
              sizes="100vw"
            />
            
            {/* Dark Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Navigation Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-[#b87333] w-[6px] h-[6px]'
                : 'bg-white/50 w-[4px] h-[4px] hover:w-[6px] hover:h-[6px] hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 group"
        aria-label="Previous slide"
      >
        <i className="fas fa-chevron-left text-white text-lg"></i>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 group"
        aria-label="Next slide"
      >
        <i className="fas fa-chevron-right text-white text-lg"></i>
      </button>

      {/* Main Content - Centered with reduced spacing */}
      <div className="relative z-20 h-full flex items-center justify-center px-4">
        <div className="max-w-5xl mx-auto text-center">
          
          {/* Main Heading - Reduced font sizes and spacing */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight"
          >
            <span className="text-white">Saudi </span>
            <span className="text-white">Scrap </span>
            <span className="text-[#b87333] relative inline-block">
              Trader
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-[#b87333] to-[#f1c40f] rounded-full"
              />
            </span>
          </motion.h1>

          {/* Subtitle - Reduced font size and spacing */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-300 mb-6 max-w-2xl mx-auto"
          >
            We buy all types of scrap materials. Get the best prices with instant cash payment and free pickup service!
          </motion.p>

          {/* CTA Buttons - Reduced size and spacing */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {/* WhatsApp Button - Smaller */}
            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-6 py-3 bg-gradient-to-r from-[#25D366] to-[#1EBEA5] text-white font-bold rounded-xl hover:scale-[1.02] transition-all duration-300 shadow-lg flex items-center justify-center min-w-[180px]"
            >
              <i className="fab fa-whatsapp text-xl mr-2"></i>
              <span className="text-base">WhatsApp</span>
            </a>

            {/* Contact Us Button - Smaller */}
            <a
              href="#contact"
              className="group relative px-6 py-3 bg-gradient-to-r from-[#2c3e50] to-[#4a5568] text-white font-bold rounded-xl hover:scale-[1.02] transition-all duration-300 shadow-lg flex items-center justify-center min-w-[180px]"
            >
              <i className="fas fa-envelope text-lg mr-2"></i>
              <span className="text-base">Contact us</span>
            </a>
          </motion.div>
          
        </div>
      </div>

    </section>
  )
}