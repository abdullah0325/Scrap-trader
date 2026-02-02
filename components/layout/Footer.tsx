'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    { href: '#home', label: 'Home' },
    { href: '#materials', label: 'Materials' },
    { href: '#services', label: 'Services' },
    { href: '#team', label: 'Team' },
  ]

  const contactInfo = [
    { icon: 'fa-phone', label: '+966 58 395 4403', href: 'tel:+966583954403' },
    { icon: 'fa-envelope', label: 'saudiscraptrader@gmail.com', href: 'mailto:saudiscraptrader@gmail.com' },
    { icon: 'fab fa-whatsapp', label: '+966 58 395 4403', href: 'https://wa.me/966583954403' },
  ]

  const socialLinks = [
    { icon: 'fab fa-facebook-f', link: '#', label: 'Facebook' },
    { icon: 'fab fa-twitter', link: '#', label: 'Twitter' },
    { icon: 'fab fa-instagram', link: '#', label: 'Instagram' },
    { icon: 'fab fa-whatsapp', link: 'https://wa.me/966583954403', label: 'WhatsApp' },
  ]

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white mt-16 sm:mt-20 md:mt-28 lg:mt-32">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-8 sm:py-12 md:py-16 lg:py-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
            {/* Company Info */}
            <motion.div
              className="col-span-2 lg:col-span-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="relative w-12 h-12 flex-shrink-0">
                  <Image
                    src="/logo.png"
                    alt="Saudi Scrap Trader - تاجر الخردة السعودي"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Saudi Scrap Trader</h3>
                </div>
              </div>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                Leading provider of scrap trading services with a commitment to quality and customer satisfaction.
              </p>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h4 className="text-base sm:text-lg font-bold mb-4 sm:mb-6 text-white">Quick Links</h4>
              <ul className="space-y-2 sm:space-y-3">
                {footerLinks.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-gray-400 hover:text-primary transition-colors duration-300 flex items-center group text-sm md:text-base"
                    >
                      <i className="fas fa-angle-right mr-2 group-hover:translate-x-1 transition-transform duration-300 text-primary"></i>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h4 className="text-base sm:text-lg font-bold mb-4 sm:mb-6 text-white">Contact Info</h4>
              <ul className="space-y-3 sm:space-y-2 md:space-y-3">
                {contactInfo.map((item, index) => (
                  <li key={index} className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors duration-300">
                    <span className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white flex-shrink-0">
                      <i className={`${item.icon} text-xs`}></i>
                    </span>
                    {item.href ? (
                      <a href={item.href} className="text-xs md:text-sm hover:text-white">
                        {item.label}
                      </a>
                    ) : (
                      <span className="text-xs md:text-sm">{item.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>


          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between text-center sm:text-left text-gray-400 text-xs sm:text-sm space-y-3 sm:space-y-0">
            <p>&copy; {currentYear} Saudi Scrap Trader. All rights reserved.</p>
            <div className="flex items-center space-x-4 sm:space-x-6">
              <a href="#" className="hover:text-primary transition-colors duration-300">
                Privacy Policy
              </a>
              <span className="text-gray-600 hidden sm:block">|</span>
              <a href="#" className="hover:text-primary transition-colors duration-300">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom social icons bar (centered) */}
      <div className="border-t border-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <div className="flex gap-3">
            {socialLinks.map((item, index) => (
              <a
                key={index}
                href={item.link}
                className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-white hover:shadow-lg hover:scale-110 transition-all duration-300"
                aria-label={item.label}
              >
                <i className={`${item.icon}`}></i>
              </a>
            ))}
          </div>
        </div>
      </div>

    </footer>
  )
}


