// /app/api/register/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { walletAddress, role } = await req.json()

    if (!walletAddress || !role) {
      return NextResponse.json(
        { error: 'Missing walletAddress or role' },
        { status: 400 }
      )
    }

    // 1️⃣ See if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { walletAddress },
    })
    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists', user: existingUser },
        { status: 200 }
      )
    }

    // 2️⃣ Create new user (let Prisma auto-generate the Int ID)
    const newUser = await prisma.user.create({
      data: {
        walletAddress,
      },
    })

    // 3️⃣ Create the profile record
    if (role === 'freelancer') {
      await prisma.freelancerProfile.create({
        data: { userId: newUser.id },
      })
    } else {
      // 'hirer'
      await prisma.hirerProfile.create({
        data: { userId: newUser.id },
      })
    }

    return NextResponse.json(
      { message: 'User created', user: newUser },
      { status: 201 }
    )
  } catch (err) {
    console.error('Registration /api/register error:', err)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
