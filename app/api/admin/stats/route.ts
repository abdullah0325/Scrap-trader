import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from "@/lib/auth"
import { prisma } from '@/lib/prisma'
import { MessageStatus } from '@prisma/client'

export async function GET() {
  const session = await getServerSession(authOptions)
  
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const [totalMessages, pendingMessages, totalMaterials, totalServices] = await Promise.all([
      prisma.contactMessage.count(),
      prisma.contactMessage.count({ where: { status: MessageStatus.PENDING } }),
      prisma.material.count(),
      prisma.service.count()
    ])

    return NextResponse.json({
      totalMessages,
      pendingMessages,
      totalMaterials,
      totalServices
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}
