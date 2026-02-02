import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from "@/lib/auth"
import { prisma } from '@/lib/prisma'
import cloudinary from '@/lib/cloudinary'

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { order: 'asc' }
    })
    return NextResponse.json(services)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const title = formData.get('title') as string
    const arabicTitle = formData.get('arabicTitle') as string
    const description = formData.get('description') as string
    const icon = formData.get('icon') as string
    const image = formData.get('image') as File

    let imageUrl = ''
    
    if (image) {
      const bytes = await image.arrayBuffer()
      const buffer = Buffer.from(bytes)
      
      const uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'barozkhan/services' },
          (error, result) => {
            if (error) reject(error)
            else resolve(result)
          }
        )
        uploadStream.end(buffer)
      })
      
      imageUrl = (uploadResult as any).secure_url
    }

    const service = await prisma.service.create({
      data: {
        title,
        arabicTitle,
        description,
        icon,
        imageUrl,
        order: 0
      }
    })

    return NextResponse.json(service)
  } catch (error) {
    console.error('Error creating service:', error)
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 })
  }
}
