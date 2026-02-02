import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function fixEmptyImageUrls() {
  try {
    const result = await prisma.material.updateMany({
      where: {
        imageUrl: ''
      },
      data: {
        imageUrl: 'https://via.placeholder.com/48x48?text=No+Image'
      }
    })

    console.log(`Updated ${result.count} materials with empty imageUrl`)
  } catch (error) {
    console.error('Error fixing empty image URLs:', error)
  } finally {
    await prisma.$disconnect()
  }
}

fixEmptyImageUrls()