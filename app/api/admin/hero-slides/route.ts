import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from "@/lib/auth"
import { prisma } from '@/lib/prisma'
import cloudinary from '@/lib/cloudinary'

export async function GET() {
  try {
    const slides = await prisma.heroSlide.findMany({
      orderBy: { order: 'asc' }
    })
    return NextResponse.json(slides)
  } catch (error) {
    console.error('HeroSlides GET Error:', error)
    if (error instanceof Error && error.stack) {
      console.error('Stack trace:', error.stack)
    }
    if ((error as any)?.code) {
      console.error('Prisma error code:', (error as any).code)
    }
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: 'Failed to fetch slides', details: errorMessage }, { status: 500 })
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
    const buttonText = formData.get('buttonText') as string
    const buttonLink = formData.get('buttonLink') as string
    const image = formData.get('image') as File

    let imageUrl = ''
    
    if (image) {
      const bytes = await image.arrayBuffer()
      const buffer = Buffer.from(bytes)
      
      const uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'saudiscraptrader/hero' },
          (error, result) => {
            if (error) reject(error)
            else resolve(result)
          }
        )
        uploadStream.end(buffer)
      })
      
      imageUrl = (uploadResult as any).secure_url
    }

    const slide = await prisma.heroSlide.create({
      data: {
        title,
        arabicTitle,
        description,
        imageUrl,
        buttonText,
        buttonLink,
        order: 0
      }
    })

    return NextResponse.json(slide)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create slide' }, { status: 500 })
  }
}