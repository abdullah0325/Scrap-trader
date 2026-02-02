'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

interface Material {
  id: string
  title: string
  arabicTitle: string
  description: string
  imageUrl: string
  category: string
  price?: string | null
}

interface RawMaterialsSectionProps {
  materials: Material[]
}

export default function RawMaterialsSection({ materials }: RawMaterialsSectionProps) {
  if (materials.length === 0) {
    return null
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="materials" className="py-20 md:py-28 lg:py-32 bg-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -mr-48 -mt-48 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">Our Services</h2>
        
        </motion.div>

        {/* Materials Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {materials.map((material) => (
            <motion.div
              key={material.id}
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl overflow-hidden border border-gray-100 hover:border-primary/20 transition-all duration-300 hover:-translate-y-1 group"
            >
              {/* Image Container */}
              <div className="relative h-64 w-full overflow-hidden bg-gray-200">
                {material.imageUrl ? (
                  <Image
                    src={material.imageUrl}
                    alt={material.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-400">
                    <i className="fas fa-image text-gray-500 text-4xl"></i>
                  </div>
                )}
                {material.price && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-primary to-primary-dark text-white px-5 py-2 rounded-full text-sm font-bold shadow-xl">
                    {material.price}
                  </div>
                )}
                <div className="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold">
                  {material.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col h-full">
                <div className="mb-4 flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                    {material.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {material.description}
                  </p>
                </div>

                {/* Action */}
                <a
                  href="#contact"
                  className="inline-flex items-center text-primary font-semibold hover:text-primary-dark transition-colors group/link mt-2"
                >
                  Contact Us
                  <i className="fas fa-arrow-right ml-2 group-hover/link:translate-x-1 transition-transform"></i>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}