import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

async function createAdmin() {
  const email = 'admin@saudiscraptrader.com'
  const password = 'Admin123!'
  const name = 'Admin User'
  
  const existingAdmin = await prisma.user.findUnique({
    where: { email }
  })
  
  if (existingAdmin) {
    console.log('Admin user already exists')
    return
  }
  
  const hashedPassword = await bcrypt.hash(password, 12)
  
  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      role: 'ADMIN'
    }
  })
  
  console.log('Admin user created successfully')
  console.log(`Email: ${email}`)
  console.log(`Password: ${password}`)
}

createAdmin()
  .catch(console.error)
  .finally(() => prisma.$disconnect())