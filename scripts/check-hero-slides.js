const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  try {
    const slides = await prisma.heroSlide.findMany({ orderBy: { order: 'asc' } })
    console.log('Hero slides:', slides)
  } catch (err) {
    console.error('Error running heroSlides query:', err)
    if (err instanceof Error && err.stack) console.error('Stack:', err.stack)
    if (err && err.code) console.error('Prisma code:', err.code)
  } finally {
    await prisma.$disconnect()
  }
}

main()
