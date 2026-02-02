import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from "@/lib/auth"
import { prisma } from '@/lib/prisma'
import cloudinary from '@/lib/cloudinary'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const material = await prisma.material.findUnique({
      where: { id }
    })
    
    if (!material) {
      return NextResponse.json({ error: 'Material not found' }, { status: 404 })
    }
    
    return NextResponse.json(material)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch material' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
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

    const existingMaterial = await prisma.material.findUnique({
      where: { id }
    })

    if (!existingMaterial) {
      return NextResponse.json({ error: 'Material not found' }, { status: 404 })
    }

    let imageUrl = existingMaterial.imageUrl

    if (image && image.size > 0) {
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
    }

    const material = await prisma.material.update({
      where: { id },
      data: {
        title,
        arabicTitle,
        description,
        category,
        price,
        imageUrl
      }
    })

    return NextResponse.json(material)
  } catch (error) {
    console.error('Error updating material:', error)
    return NextResponse.json({ error: 'Failed to update material' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const session = await getServerSession(authOptions)
  
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await prisma.material.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Material deleted' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete material' }, { status: 500 })
  }
}
