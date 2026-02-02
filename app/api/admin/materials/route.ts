import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from "@/lib/auth"
import { prisma } from '@/lib/prisma'
import cloudinary from '@/lib/cloudinary'

export async function GET() {
  try {
    const materials = await prisma.material.findMany({
      orderBy: { order: 'asc' }
    })
    return NextResponse.json(materials)
  } catch (error) {
    console.error('Materials GET Error:', error)
    if (error instanceof Error && error.stack) {
      console.error('Stack trace:', error.stack)
    }
    // Log Prisma-specific error code if available
    if ((error as any)?.code) {
      console.error('Prisma error code:', (error as any).code)
    }
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: 'Failed to fetch materials', details: errorMessage }, { status: 500 })
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
    const category = formData.get('category') as string
    const price = formData.get('price') as string
    const image = formData.get('image') as File

    let imageUrl = ''

    if (image && image.size > 0) {
      try {
        const bytes = await image.arrayBuffer()
        const buffer = Buffer.from(bytes)
        
        const uploadResult = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'barozkhan/materials' },
            (error, result) => {
              if (error) reject(error)
              else resolve(result)
            }
          )
          uploadStream.end(buffer)
        })
        
        imageUrl = (uploadResult as any).secure_url
        console.log('Image uploaded successfully:', imageUrl)
      } catch (uploadError) {
        console.error('Cloudinary upload error:', uploadError)
        throw uploadError
      }
    } else {
      console.log('No image provided or image is empty')
    }

    const material = await prisma.material.create({
      data: {
        title,
        arabicTitle,
        description,
        category,
        price,
        imageUrl: imageUrl || '',
        order: 0
      }
    })

    return NextResponse.json(material)
  } catch (error) {
    console.error('Error creating material:', error)
    return NextResponse.json({ error: 'Failed to create material' }, { status: 500 })
  }
}
