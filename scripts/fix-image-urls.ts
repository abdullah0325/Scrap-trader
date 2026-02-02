import { prisma } from '../lib/prisma'

async function fixImageUrls() {
  try {
    console.log('Fixing image URLs...')

    // Update hero slides with incorrect paths
    const heroSlides = await prisma.heroSlide.findMany({
      where: {
        imageUrl: {
          startsWith: '/public/'
        }
      }
    })

    for (const slide of heroSlides) {
      const correctedUrl = slide.imageUrl.replace('/public/', '/')
      await prisma.heroSlide.update({
        where: { id: slide.id },
        data: { imageUrl: correctedUrl }
      })
      console.log(`Updated hero slide ${slide.id}: ${slide.imageUrl} -> ${correctedUrl}`)
    }

    // Update services with incorrect paths
    const services = await prisma.service.findMany({
      where: {
        imageUrl: {
          startsWith: '/public/'
        }
      }
    })

    for (const service of services) {
      const correctedUrl = service.imageUrl.replace('/public/', '/')
      await prisma.service.update({
        where: { id: service.id },
        data: { imageUrl: correctedUrl }
      })
      console.log(`Updated service ${service.id}: ${service.imageUrl} -> ${correctedUrl}`)
    }

    // Update materials with incorrect paths
    const materials = await prisma.material.findMany({
      where: {
        imageUrl: {
          startsWith: '/public/'
        }
      }
    })

    for (const material of materials) {
      const correctedUrl = material.imageUrl.replace('/public/', '/')
      await prisma.material.update({
        where: { id: material.id },
        data: { imageUrl: correctedUrl }
      })
      console.log(`Updated material ${material.id}: ${material.imageUrl} -> ${correctedUrl}`)
    }

    // Update team members with incorrect paths
    const teamMembers = await prisma.teamMember.findMany({
      where: {
        imageUrl: {
          startsWith: '/public/'
        }
      }
    })

    for (const member of teamMembers) {
      const correctedUrl = member.imageUrl.replace('/public/', '/')
      await prisma.teamMember.update({
        where: { id: member.id },
        data: { imageUrl: correctedUrl }
      })
      console.log(`Updated team member ${member.id}: ${member.imageUrl} -> ${correctedUrl}`)
    }

    console.log('Image URLs fixed successfully!')
  } catch (error) {
    console.error('Error fixing image URLs:', error)
  } finally {
    await prisma.$disconnect()
  }
}

fixImageUrls()