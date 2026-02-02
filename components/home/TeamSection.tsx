'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

interface TeamMember {
  id: string
  name: string
  arabicName: string
  role: string
  phone: string
  whatsapp: string
  email?: string | null
  imageUrl: string
}

interface TeamSectionProps {
  team: TeamMember[]
}

export default function TeamSection({ team }: TeamSectionProps) {
  if (team.length === 0) {
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
    <section id="team" className="py-20 md:py-28 lg:py-32 bg-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full -mr-48 -mt-48 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">Our Team</h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Meet our experienced team ready to serve you
          </p>
        </motion.div>

        {/* Team Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {team.map((member) => (
            <motion.div
              key={member.id}
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl overflow-hidden border border-gray-100 hover:border-primary/20 transition-all duration-300 hover:-translate-y-1 group"
            >
              {/* Image Container */}
              <div className="relative h-80 w-full overflow-hidden bg-gray-300">
                <Image
                  src={member.imageUrl}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  unoptimized
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Contact Icons on Image */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  <a
                    href={`tel:${member.phone}`}
                    className="w-12 h-12 bg-primary hover:bg-primary-dark text-white rounded-full flex items-center justify-center transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-110"
                    aria-label="Call"
                  >
                    <i className="fas fa-phone"></i>
                  </a>
                  <a
                    href={`https://wa.me/${member.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-green-600 hover:bg-green-700 text-white rounded-full flex items-center justify-center transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-110"
                    aria-label="WhatsApp"
                  >
                    <i className="fab fa-whatsapp"></i>
                  </a>
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="w-12 h-12 bg-accent hover:bg-accent-dark text-white rounded-full flex items-center justify-center transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-110"
                      aria-label="Email"
                    >
                      <i className="fas fa-envelope"></i>
                    </a>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                  {member.name}
                </h3>
                <p className="text-gray-600 font-semibold mb-4 text-sm">
                  {member.role}
                </p>

                {/* Contact Icons Below (Mobile Friendly) */}
                <div className="flex justify-center space-x-3 md:hidden">
                  <a
                    href={`tel:${member.phone}`}
                    className="text-primary hover:text-primary-dark text-lg"
                    aria-label="Call"
                  >
                    <i className="fas fa-phone"></i>
                  </a>
                  <a
                    href={`https://wa.me/${member.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:text-green-700 text-lg"
                    aria-label="WhatsApp"
                  >
                    <i className="fab fa-whatsapp"></i>
                  </a>
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="text-accent hover:text-accent-dark text-lg"
                      aria-label="Email"
                    >
                      <i className="fas fa-envelope"></i>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}