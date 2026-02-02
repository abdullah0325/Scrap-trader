// 'use client'

// import { useState, useEffect } from 'react'
// import { signIn, useSession } from 'next-auth/react'
// import { useRouter } from 'next/navigation'
// import { toast } from 'react-hot-toast'
// import Image from 'next/image'
// import { motion } from 'framer-motion'

// export default function LoginPage() {
//   const { data: session, status } = useSession()
//   const router = useRouter()
//   const [loading, setLoading] = useState(false)
//   const [showPassword, setShowPassword] = useState(false)
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   })

//   useEffect(() => {
//     if (status === 'authenticated') {
//       router.push('/admin')
//     }
//   }, [status, router])

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setLoading(true)

//     try {
//       const result = await signIn('credentials', {
//         email: formData.email,
//         password: formData.password,
//         redirect: false
//       })

//       if (result?.error) {
//         toast.error('Invalid email or password')
//       } else {
//         toast.success('Login successful!')
//         router.push('/admin')
//         router.refresh()
//       }
//     } catch (error) {
//       toast.error('An error occurred. Please try again.')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2,
//         delayChildren: 0.1,
//       },
//     },
//   }

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.5 },
//     },
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-primary via-primary/80 to-accent flex items-center justify-center p-4">
//       {/* Background decoration */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full -ml-48 -mt-48 blur-3xl"></div>
//         <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mb-48 blur-3xl"></div>
//       </div>

//       <motion.div
//         className="relative z-10 w-full max-w-md"
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         {/* Card */}
//         <motion.div
//           variants={itemVariants}
//           className="bg-white rounded-2xl shadow-2xl overflow-hidden"
//         >
//           {/* Header */}
//           <div className="bg-gradient-to-r from-primary to-primary-dark text-white p-8 text-center">
//             <motion.div
//               className="mb-4"
//               variants={itemVariants}
//             >
//               <div className="relative w-16 h-16 mx-auto mb-4">
//                 <Image
//                   src="/logo.png"
//                   alt="Saudi Scrap Trader"
//                   fill
//                   className="object-contain"
//                 />
//               </div>
//             </motion.div>
//             <h1 className="text-3xl font-bold mb-2">Admin Login</h1>
//             <p className="text-white/90 text-sm">Saudi Scrap Trader Admin Panel</p>
//           </div>

//           {/* Form */}
//           <div className="p-8">
//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Email Field */}
//               <motion.div variants={itemVariants}>
//                 <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-3">
//                   <i className="fas fa-envelope mr-2 text-primary"></i>
//                   Email Address
//                 </label>
//                 <input
//                   id="email"
//                   type="email"
//                   required
//                   value={formData.email}
//                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                   className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300"
//                   placeholder="admin@barozkhan.com"
//                   disabled={loading}
//                 />
//               </motion.div>

//               {/* Password Field */}
//               <motion.div variants={itemVariants}>
//                 <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-3">
//                   <i className="fas fa-lock mr-2 text-primary"></i>
//                   Password
//                 </label>
//                 <div className="relative">
//                   <input
//                     id="password"
//                     type={showPassword ? 'text' : 'password'}
//                     required
//                     value={formData.password}
//                     onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                     className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300"
//                     placeholder="Enter your password"
//                     disabled={loading}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary transition-colors"
//                   >
//                     <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
//                   </button>
//                 </div>
//               </motion.div>

//               {/* Submit Button */}
//               <motion.button
//                 variants={itemVariants}
//                 type="submit"
//                 disabled={loading}
//                 className="w-full py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg hover:shadow-lg active:scale-95 font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
//               >
//                 {loading ? (
//                   <>
//                     <i className="fas fa-spinner animate-spin"></i>
//                     <span>Logging in...</span>
//                   </>
//                 ) : (
//                   <>
//                     <i className="fas fa-sign-in-alt"></i>
//                     <span>Login</span>
//                   </>
//                 )}
//               </motion.button>
//             </form>

//             {/* Demo Credentials */}
//             <motion.div
//               variants={itemVariants}
//               className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200"
//             >
//               <p className="text-xs font-semibold text-blue-900 mb-2">
//                 <i className="fas fa-info-circle mr-1"></i>
//                 Demo Credentials:
//               </p>
//               <p className="text-xs text-blue-800 font-mono mb-1">
//                 Email: admin@barozkhan.com
//               </p>
//               <p className="text-xs text-blue-800 font-mono">
//                 Password: admin123
//               </p>
//             </motion.div>
//           </div>
//         </motion.div>

//         {/* Footer Link */}
//         <motion.p
//           variants={itemVariants}
//           className="text-center text-white mt-6 text-sm"
//         >
//           <a
//             href="/"
//             className="hover:underline hover:text-yellow-300 transition-colors duration-300 flex items-center justify-center"
//           >
//             <i className="fas fa-home mr-2"></i>
//             Back to Home
//           </a>
//         </motion.p>
//       </motion.div>
//     </div>
//   )
// }



'use client'

import { useState, useEffect } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import Link from 'next/link'

export default function LoginPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [resetEmail, setResetEmail] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/admin')
    }
  }, [status, router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false
      })

      if (result?.error) {
        toast.error('Invalid email or password')
      } else {
        toast.success('Login successful!')
        router.push('/admin')
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!resetEmail) {
      toast.error('Please enter your email address')
      return
    }

    setLoading(true)
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(resetEmail)) {
        toast.error('Please enter a valid email address')
        return
      }

      toast.success('If this email is registered, you will receive reset instructions.')
      setShowForgotPassword(false)
      setResetEmail('')
    } catch (error) {
      toast.error('Failed to process request.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        
        {/* Back to Home */}
        <div className="mb-6">
          <Link 
            href="/" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 text-sm"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Back to Website
          </Link>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-[#2c3e50] rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-lock text-white text-xl"></i>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
            <p className="text-gray-600 mt-1 text-sm">Saudi Scrap Trader Dashboard</p>
          </div>

          {/* Login Form */}
          {!showForgotPassword ? (
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#2c3e50] focus:border-[#2c3e50]"
                  placeholder="admin@example.com"
                  disabled={loading}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-xs text-[#b87333] hover:text-[#2c3e50]"
                  >
                    Forgot Password?
                  </button>
                </div>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#2c3e50] focus:border-[#2c3e50]"
                  placeholder="Enter your password"
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#2c3e50] text-white font-medium rounded-lg hover:bg-[#1a252f] transition-colors disabled:opacity-50 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <i className="fas fa-spinner animate-spin mr-2"></i>
                    Signing In...
                  </>
                ) : (
                  <>
                    <i className="fas fa-sign-in-alt mr-2"></i>
                    Sign In
                  </>
                )}
              </button>
            </form>
          ) : (
            /* Forgot Password Form */
            <form onSubmit={handleForgotPassword} className="space-y-5">
              <div className="text-center mb-4">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Reset Password</h2>
                <p className="text-gray-600 text-sm">Enter your email to receive reset instructions</p>
              </div>

              <div>
                <label htmlFor="forgotEmail" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="forgotEmail"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#2c3e50] focus:border-[#2c3e50]"
                  placeholder="you@example.com"
                  disabled={loading}
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowForgotPassword(false)
                    setResetEmail('')
                  }}
                  className="flex-1 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-2.5 bg-[#b87333] text-white font-medium rounded-lg hover:bg-[#a0662d] transition-colors text-sm flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <i className="fas fa-spinner animate-spin mr-2"></i>
                      Sending...
                    </>
                  ) : (
                    'Send Reset Link'
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Demo Credentials */}
          <div className="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs font-medium text-blue-900 mb-1">
              <i className="fas fa-info-circle mr-1"></i>
              Demo Credentials:
            </p>
            <p className="text-xs text-blue-800 font-mono">admin@barozkhan.com</p>
            <p className="text-xs text-blue-800 font-mono">admin123</p>
          </div>

          {/* Security Note */}
          <div className="mt-6 pt-5 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Admin access only. Unauthorized access prohibited.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Saudi Scrap Trader
          </p>
        </div>
      </div>
    </div>
  )
}