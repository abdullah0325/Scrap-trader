import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from "@/lib/auth"
import { prisma } from '@/lib/prisma'
import cloudinary from '@/lib/cloudinary'

export async function GET() {
  try {
    const members = await prisma.teamMember.findMany({
      orderBy: { order: 'asc' }
    })
    return NextResponse.json(members)
  } catch (error) {
    console.error('Team GET Error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: 'Failed to fetch team members', details: errorMessage }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const name = formData.get('name') as string
    const arabicName = formData.get('arabicName') as string
    const role = formData.get('role') as string
    const phone = formData.get('phone') as string
    const whatsapp = formData.get('whatsapp') as string
    const email = formData.get('email') as string
    const image = formData.get('image') as File

    let imageUrl = ''
    
    if (image && image.size > 0) {
      try {
        const bytes = await image.arrayBuffer()
        const buffer = Buffer.from(bytes)
        
        const uploadResult = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'barozkhan/team' },
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

    const member = await prisma.teamMember.create({
      data: {
        name,
        arabicName,
        role,
        phone,
        whatsapp,
        email: email || null,
        imageUrl,
        order: 0
      }
    })

    return NextResponse.json(member)
  } catch (error) {
    console.error('Error creating team member:', error)
    return NextResponse.json({ error: 'Failed to create team member' }, { status: 500 })
  }
}
