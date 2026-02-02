'use client'

import { motion } from 'framer-motion'

export default function BusinessInfoBanner() {
  const features = [
    {
      icon: 'fa-truck',
      title: 'Free Pickup',
      arabic: 'استلام مجاني',
      description: 'We come to you',
      color: 'from-primary to-primary-dark'
    },
    {
      icon: 'fa-dollar-sign',
      title: 'Best Prices',
      arabic: 'أفضل الأسعار',
      description: 'Competitive rates',
      color: 'from-secondary to-yellow-600'
    },
    {
      icon: 'fa-clock',
      title: '24/7 Service',
      arabic: 'خدمة على مدار الساعة',
      description: 'Always available',
      color: 'from-accent to-teal-600'
    },
    {
      icon: 'fa-shield-alt',
      title: 'Trusted',
      arabic: 'موثوق',
      description: 'Licensed & insured',
      color: 'from-blue-500 to-blue-600'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
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
    <section className="py-16 md:py-20 bg-gradient-to-r from-primary via-primary-dark to-accent text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group"
            >
              <div className="text-center p-6 md:p-8 rounded-2xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 transform hover:scale-105 border border-white/20">
                <div className={`inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br ${feature.color} text-white mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl`}>
                  <i className={`fas ${feature.icon} text-2xl md:text-3xl`}></i>
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-sm opacity-75">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}


