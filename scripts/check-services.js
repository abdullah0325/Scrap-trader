const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  try {
    const services = await prisma.service.findMany({ orderBy: { order: 'asc' } })
    console.log('Services:', services)
  } catch (err) {
    console.error('Error running services query:', err)
    if (err instanceof Error && err.stack) console.error('Stack:', err.stack)
    if (err && err.code) console.error('Prisma code:', err.code)
  } finally {
    await prisma.$disconnect()
  }
}

main()
