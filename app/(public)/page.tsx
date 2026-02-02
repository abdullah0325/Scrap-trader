import { prisma } from '@/lib/prisma'
import HeroSection from '@/components/home/HeroSection'
import BusinessInfoBanner from '@/components/home/BusinessInfoBanner'
import RawMaterialsSection from '@/components/home/RawMaterialsSection'
import ServicesSection from '@/components/home/ServicesSection'
import TeamSection from '@/components/home/TeamSection'
import ContactSection from '@/components/home/ContactSection'
import WhyChooseUs from '@/components/home/About'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  try {
    // Fetch directly from the DB to ensure live data (server-side)
    const [slides, materials, services, team] = await Promise.all([
      prisma.heroSlide.findMany({ where: { active: true }, orderBy: { order: 'asc' } }),
      prisma.material.findMany({ where: { active: true }, orderBy: { order: 'asc' } }),
      prisma.service.findMany({ where: { active: true }, orderBy: { order: 'asc' } }),
      prisma.teamMember.findMany({ where: { active: true }, orderBy: { order: 'asc' } }),
    ])

    return (
      <main className="min-h-screen w-full overflow-x-hidden">
        <HeroSection />
        <RawMaterialsSection materials={materials || []} />
        <WhyChooseUs />
        <TeamSection team={team || []} />
        <ContactSection />
      </main>
    )
  } catch (error) {
    console.error('Error rendering home page:', error)
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Error Loading Page</h1>
          <p className="text-gray-600">Please check your database connection and try again.</p>
        </div>
      </main>
    )
  }
}



