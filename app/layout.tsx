import type { Metadata } from 'next'
import { Cairo, Roboto } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@/components/providers/AuthProvider'

const cairo = Cairo({
  subsets: ['arabic'],
  variable: '--font-cairo',
})

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto',
})

export const metadata: Metadata = {
  title: 'Saudi Scrap Trader | شركة تجارة الخردة السعودية',
  description: 'We buy all types of scrap materials including metal, plastic, electronics, and industrial waste at competitive prices throughout Saudi Arabia.',
  keywords: 'scrap trader, scrap materials, Saudi Arabia, metal recycling, تاجر الخردة السعودي, شركة تجارة الخردة',
  openGraph: {
    title: 'Saudi Scrap Trader | شركة تجارة الخردة السعودية',
    description: 'We buy all types of scrap materials including metal, plastic, electronics, and industrial waste at competitive prices throughout Saudi Arabia.',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" dir="ltr" className={`${roboto.variable} ${cairo.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body className="font-roboto">
        <AuthProvider>
          <main>{children}</main>
          <Toaster position="top-right" />
        </AuthProvider>
      </body>
    </html>
  )
}
    