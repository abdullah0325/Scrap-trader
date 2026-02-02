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
    const member = await prisma.teamMember.findUnique({
      where: { id }
    })
    
    if (!member) {
      return NextResponse.json({ error: 'Team member not found' }, { status: 404 })
    }
    
    return NextResponse.json(member)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch team member' }, { status: 500 })
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
    const name = formData.get('name') as string
    const arabicName = formData.get('arabicName') as string
    const role = formData.get('role') as string
    const phone = formData.get('phone') as string
    const whatsapp = formData.get('whatsapp') as string
    const email = formData.get('email') as string
    const image = formData.get('image') as File

    const existingMember = await prisma.teamMember.findUnique({
      where: { id }
    })

    if (!existingMember) {
      return NextResponse.json({ error: 'Team member not found' }, { status: 404 })
    }

    let imageUrl = existingMember.imageUrl

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
        console.log('Image updated successfully:', imageUrl)
      } catch (uploadError) {
        console.error('Cloudinary upload error:', uploadError)
        throw uploadError
      }
    } else {
      console.log('No new image provided')
    }

    const member = await prisma.teamMember.update({
      where: { id },
      data: {
        name,
        arabicName,
        role,
        phone,
        whatsapp,
        email: email || null,
        imageUrl
      }
    })

    return NextResponse.json(member)
  } catch (error) {
    console.error('Error updating team member:', error)
    return NextResponse.json({ error: 'Failed to update team member' }, { status: 500 })
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
    await prisma.teamMember.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Team member deleted' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete team member' }, { status: 500 })
  }
}
