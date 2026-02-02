import { PrismaClient, Role, MessageStatus } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@saudiscraptrader.com' },
    update: {},
    create: {
      email: 'admin@saudiscraptrader.com',
      password: hashedPassword,
      name: 'Admin User',
      role: Role.ADMIN,
    },
  })

  // Create hero slides
  const heroSlides = await Promise.all([
    prisma.heroSlide.upsert({
      where: { id: 'hero-1' },
      update: {},
      create: {
        id: 'hero-1',
        title: 'Welcome to Saudi Scrap Trader',
        arabicTitle: 'مرحبا بكم في تاجر الخردة السعودي',
        description: 'Leading provider of construction materials and services in the region',
        imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1400&q=80',
        buttonText: 'Explore Services',
        buttonLink: '/services',
        active: true,
        order: 1,
      },
    }),
    prisma.heroSlide.upsert({
      where: { id: 'hero-2' },
      update: {},
      create: {
        id: 'hero-2',
        title: 'Quality Materials',
        arabicTitle: 'مواد عالية الجودة',
        description: 'We offer the finest construction materials for your projects',
        imageUrl: 'https://images.unsplash.com/photo-1537648410183-a095bf694338?auto=format&fit=crop&w=1400&q=80',
        buttonText: 'View Materials',
        buttonLink: '/materials',
        active: true,
        order: 2,
      },
    }),
  ])

  // Create services
  const services = await Promise.all([
    prisma.service.upsert({
      where: { id: 'service-1' },
      update: {},
      create: {
        id: 'service-1',
        title: 'Construction Services',
        arabicTitle: 'خدمات البناء',
        description: 'Complete construction solutions for residential and commercial projects',
        imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1400&q=80',
        icon: 'building',
        active: true,
        order: 1,
      },
    }),
    prisma.service.upsert({
      where: { id: 'service-2' },
      update: {},
      create: {
        id: 'service-2',
        title: 'Material Supply',
        arabicTitle: 'توريد المواد',
        description: 'Wide range of construction materials delivered to your doorstep',
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1400&q=80',
        icon: 'truck',
        active: true,
        order: 2,
      },
    }),
    prisma.service.upsert({
      where: { id: 'service-3' },
      update: {},
      create: {
        id: 'service-3',
        title: 'Consultation',
        arabicTitle: 'الاستشارات',
        description: 'Expert advice on construction projects and material selection',
        imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80',
        icon: 'users',
        active: true,
        order: 3,
      },
    }),
  ])

  // Create materials
  const materials = await Promise.all([
    prisma.material.upsert({
      where: { id: 'material-1' },
      update: {},
      create: {
        id: 'material-1',
        title: 'Cement',
        arabicTitle: 'الأسمنت',
        description: 'High-quality cement for all construction needs',
        imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1400&q=80',
        category: 'Building Materials',
        price: '25.00',
        active: true,
        order: 1,
      },
    }),
    prisma.material.upsert({
      where: { id: 'material-2' },
      update: {},
      create: {
        id: 'material-2',
        title: 'Steel Rebars',
        arabicTitle: 'حديد التسليح',
        description: 'Durable steel rebars for reinforced concrete',
        imageUrl: 'https://images.unsplash.com/photo-1537648410183-a095bf694338?auto=format&fit=crop&w=1400&q=80',
        category: 'Metal Products',
        price: '85.00',
        active: true,
        order: 2,
      },
    }),
    prisma.material.upsert({
      where: { id: 'material-3' },
      update: {},
      create: {
        id: 'material-3',
        title: 'Bricks',
        arabicTitle: 'الطوب',
        description: 'Red clay bricks for construction',
        imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1400&q=80',
        category: 'Building Materials',
        price: '0.50',
        active: true,
        order: 3,
      },
    }),
  ])

  // Create team members
  const teamMembers = await Promise.all([
    prisma.teamMember.upsert({
      where: { id: 'team-1' },
      update: {},
      create: {
        id: 'team-1',
        name: 'Ahmed Khan',
        arabicName: 'أحمد خان',
        role: 'CEO & Founder',
        phone: '+971-50-123-4567',
        whatsapp: '+971-50-123-4567',
        email: 'ahmed@saudiscraptrader.com',
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=80',
        active: true,
        order: 1,
      },
    }),
    prisma.teamMember.upsert({
      where: { id: 'team-2' },
      update: {},
      create: {
        id: 'team-2',
        name: 'Fatima Al-Zahra',
        arabicName: 'فاطمة الزهراء',
        role: 'Operations Manager',
        phone: '+971-50-234-5678',
        whatsapp: '+971-50-234-5678',
        email: 'fatima@saudiscraptrader.com',
        imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&h=400&q=80',
        active: true,
        order: 2,
      },
    }),
  ])

  // Create sample contact messages
  const contactMessages = await Promise.all([
    prisma.contactMessage.upsert({
      where: { id: 'contact-1' },
      update: {},
      create: {
        id: 'contact-1',
        name: 'John Smith',
        phone: '+1-555-0123',
        email: 'john@example.com',
        message: 'Interested in bulk cement order',
        materialType: 'Cement',
        status: MessageStatus.PENDING,
        whatsapp: '+1-555-0123',
      },
    }),
    prisma.contactMessage.upsert({
      where: { id: 'contact-2' },
      update: {},
      create: {
        id: 'contact-2',
        name: 'Maria Garcia',
        phone: '+34-666-123456',
        email: 'maria@example.com',
        message: 'Need consultation for new construction project',
        status: MessageStatus.CONTACTED,
      },
    }),
  ])

  console.log('Database seeded successfully!')
  console.log({
    admin,
    heroSlides: heroSlides.length,
    services: services.length,
    materials: materials.length,
    teamMembers: teamMembers.length,
    contactMessages: contactMessages.length,
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })