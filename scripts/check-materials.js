const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  try {
    const materials = await prisma.material.findMany({ orderBy: { order: 'asc' } })
    console.log('Materials:', materials)
  } catch (err) {
    console.error('Error running materials query:', err)
  } finally {
    await prisma.$disconnect()
  }
}

main()
