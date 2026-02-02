'use client'

import Image from 'next/image'

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Left Side - Heading and Text */}
          <div className="lg:w-1/2">
            <div className="mb-8">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
                Why Choose Us
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                We are committed to providing reliable and transparent scrap trading services with years of industry experience.
              </p>
            </div>

            {/* Key Points */}
            <div className="space-y-6">
              {/* Point 1 */}
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-[#b87333] rounded-full flex items-center justify-center">
                    <i className="fas fa-shield-alt text-white text-lg"></i>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Licensed & Trusted
                  </h3>
                  <p className="text-gray-600">
                    Fully licensed company with years of reliable service in Saudi Arabia.
                  </p>
                </div>
              </div>

              {/* Point 2 */}
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-[#b87333] rounded-full flex items-center justify-center">
                    <i className="fas fa-money-bill-wave text-white text-lg"></i>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Best Market Prices
                  </h3>
                  <p className="text-gray-600">
                    Get competitive rates with instant cash payment for all scrap materials.
                  </p>
                </div>
              </div>

              {/* Point 3 */}
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-[#b87333] rounded-full flex items-center justify-center">
                    <i className="fas fa-truck text-white text-lg"></i>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Free Pickup Service
                  </h3>
                  <p className="text-gray-600">
                    We collect scrap from your location free of charge across Saudi Arabia.
                  </p>
                </div>
              </div>

              {/* Point 4 */}
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-[#b87333] rounded-full flex items-center justify-center">
                    <i className="fas fa-clock text-white text-lg"></i>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    24/7 Service
                  </h3>
                  <p className="text-gray-600">
                    Available round-the-clock to serve your scrap trading needs.
                  </p>
                </div>
              </div>
            </div>

        
          </div>

          {/* Right Side - Image (always visible; responsive height; subtle overlay) */}
          <div className="lg:w-1/2 w-full">
            <div className="relative h-56 sm:h-64 md:h-80 lg:h-[400px] xl:h-[500px] rounded-lg overflow-hidden shadow-lg bg-gray-100">
              <Image
                src="/WhatsApp Image 2026-01-14 at 3.17.49 PM.jpeg"
                alt="Saudi Scrap Trader Process"
                fill
                className="object-cover"
              />

              {/* Subtle dark overlay to lower opacity for text contrast */}
              <div className="absolute inset-0 bg-black/20 pointer-events-none" />

              {/* Fallback background content so there's never empty space */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-400 opacity-0" aria-hidden>
                <i className="fas fa-industry text-4xl"></i>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}