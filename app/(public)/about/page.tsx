'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function AboutPage() {
  const stats = [
    { number: '15+', label: 'Years Experience', arabic: 'سنوات من الخبرة' },
    { number: '5000+', label: 'Happy Clients', arabic: 'عميل سعيد' },
    { number: '10000+', label: 'Projects Completed', arabic: 'مشروع مكتمل' },
    { number: '24/7', label: 'Customer Support', arabic: 'دعم العملاء' },
  ]

  const values = [
    {
      icon: 'fas fa-shield-alt',
      title: 'Quality Assurance',
      arabic: 'ضمان الجودة',
      description: 'We maintain the highest standards in all our materials and services, ensuring durability and reliability.',
    },
    {
      icon: 'fas fa-handshake',
      title: 'Customer First',
      arabic: 'العميل أولاً',
      description: 'Your satisfaction is our priority. We build lasting relationships through exceptional service.',
    },
    {
      icon: 'fas fa-lightbulb',
      title: 'Innovation',
      arabic: 'الابتكار',
      description: 'We continuously improve our processes and adopt new technologies to serve you better.',
    },
    {
      icon: 'fas fa-award',
      title: 'Excellence',
      arabic: 'التميز',
      description: 'We strive for excellence in every project, delivering results that exceed expectations.',
    },
    {
      icon: 'fas fa-globe',
      title: 'Sustainability',
      arabic: 'الاستدامة',
      description: 'We are committed to environmentally responsible practices in all our operations.',
    },
    {
      icon: 'fas fa-users',
      title: 'Teamwork',
      arabic: 'العمل الجماعي',
      description: 'Our collaborative approach ensures seamless coordination and successful project delivery.',
    },
  ]

  const whyChooseUs = [
    {
      icon: 'fas fa-truck',
      title: 'Free Pickup Service',
      arabic: 'خدمة الاستلام المجانية',
      description: 'We come to you! Our free pickup service makes it convenient to sell your scrap materials.',
    },
    {
      icon: 'fas fa-dollar-sign',
      title: 'Best Market Prices',
      arabic: 'أفضل أسعار السوق',
      description: 'We offer competitive prices for all types of scrap materials, ensuring you get the best value.',
    },
    {
      icon: 'fas fa-clock',
      title: '24/7 Availability',
      arabic: 'متاح على مدار الساعة',
      description: 'Our team is available round the clock to assist you with your needs, whenever you need us.',
    },
    {
      icon: 'fas fa-certificate',
      title: 'Licensed & Insured',
      arabic: 'مرخص ومؤمن',
      description: 'Fully licensed and insured operations, giving you peace of mind and protection.',
    },
    {
      icon: 'fas fa-tools',
      title: 'Expert Team',
      arabic: 'فريق خبير',
      description: 'Our experienced professionals have the knowledge and expertise to handle any project.',
    },
    {
      icon: 'fas fa-star',
      title: 'Proven Track Record',
      arabic: 'سجل حافل',
      description: 'Years of successful projects and satisfied customers speak to our reliability and quality.',
    },
  ]

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
    <main className="min-h-screen w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] bg-gradient-to-br from-primary via-primary-dark to-accent flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center text-white py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">About Saudi Scrap Trader</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90 leading-relaxed">
              Your trusted partner for scrap trading services in Saudi Arabia
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 md:py-28 lg:py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>
                  Saudi Scrap Trader was founded with a vision to revolutionize the scrap trading industry in Saudi Arabia. What started as a small local business has grown into a trusted name known for quality, reliability, and exceptional customer service.
                </p>
                <p>
                  Over the years, we have built strong relationships with clients across the region, providing fair, competitive prices for all types of scrap materials. Our commitment to excellence and customer satisfaction has been the cornerstone of our success.
                </p>
                <p>
                  Today, we continue to expand our services, adopt new technologies, and maintain our core values of integrity, quality, and customer-first approach. We are proud to serve our community and contribute to the growth of the recycling and scrap trading industry in Saudi Arabia.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
                alt="Construction site"
                fill
                className="object-cover"
                unoptimized
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 md:py-28 lg:py-32 bg-gray-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -mr-48 -mt-48 blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-16 md:mb-20"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">Mission & Vision</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white text-2xl mb-6">
                <i className="fas fa-bullseye"></i>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                To provide high-quality construction materials and scrap trading services while maintaining the highest standards of integrity, customer satisfaction, and environmental responsibility. We aim to be the most trusted partner for all construction and recycling needs in Saudi Arabia.
              </p>
            </motion.div>

            <motion.div
              className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center text-white text-2xl mb-6">
                <i className="fas fa-eye"></i>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                To become the leading construction materials and scrap trading company in the Middle East, recognized for innovation, sustainability, and excellence. We envision a future where we continue to grow while maintaining our core values and contributing positively to our community and environment.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 md:py-28 bg-gradient-to-r from-primary via-primary-dark to-accent text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center"
              >
                <div className="text-5xl md:text-6xl lg:text-7xl font-bold mb-3">{stat.number}</div>
                <div className="text-lg md:text-xl font-semibold">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 md:py-28 lg:py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16 md:mb-20"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">Our Core Values</h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl p-8 border border-gray-100 hover:border-primary/20 transition-all duration-300 hover:-translate-y-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white text-2xl mb-6">
                  <i className={value.icon}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 md:py-28 lg:py-32 bg-gray-50 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full -ml-48 -mb-48 blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-16 md:mb-20"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">Why Choose Us</h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
              What sets us apart from the competition
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl p-8 border border-gray-100 hover:border-primary/20 transition-all duration-300 hover:-translate-y-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white text-2xl mb-6">
                  <i className={item.icon}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 md:py-28 bg-gradient-to-r from-primary via-primary-dark to-accent text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Ready to Work With Us?</h2>
            <p className="text-lg md:text-xl mb-10 opacity-90 max-w-2xl mx-auto leading-relaxed">
              Get in touch with us today and experience the difference that quality, reliability, and exceptional service can make for your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary rounded-xl hover:bg-gray-100 font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
                <span>Contact Us</span>
                <i className="fas fa-arrow-right ml-3"></i>
              </Link>
              <Link
                href="/#services"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl hover:bg-white/10 font-bold text-lg transition-all duration-300"
              >
                <span>Our Services</span>
                <i className="fas fa-chevron-right ml-3"></i>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

