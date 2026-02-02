'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

interface Service {
  id: string
  title: string
  arabicTitle: string
  description: string
  imageUrl: string
  icon: string
}

interface ServicesSectionProps {
  services: Service[]
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  if (services.length === 0) {
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
    <section id="services" className="py-20 md:py-28 lg:py-32 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full -ml-48 -mb-48 blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-xl text-primary font-cairo font-semibold mb-4">خدماتنا</p>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Comprehensive construction materials and services
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              className="card card-hover group relative overflow-hidden"
            >
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 group-hover:from-primary/10 group-hover:to-accent/10 transition-all duration-300"></div>

              {/* Image Container */}
              {service.imageUrl && (
                <div className="relative h-64 w-full overflow-hidden bg-gray-200 rounded-t-lg">
                  <Image
                    src={service.imageUrl}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    unoptimized
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-6 relative z-10">
                {/* Icon */}
                {service.icon && (
                  <div className="mb-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent text-white">
                      <i className={`${service.icon} text-xl`}></i>
                    </div>
                  </div>
                )}

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>

                {/* Arabic Title */}
                <p className="text-sm text-primary font-cairo font-semibold mb-3">
                  {service.arabicTitle}
                </p>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Learn More Link */}
                <a
                  href="#contact"
                  className="inline-flex items-center text-primary font-semibold hover:text-primary-dark transition-colors group/link"
                >
                  Get Service
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
