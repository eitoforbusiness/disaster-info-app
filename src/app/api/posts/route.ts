import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// 投稿一覧を取得
export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      take: 50
    })
    
    return NextResponse.json(posts)
  } catch (error) {
    console.error('投稿取得エラー:', error)
    return NextResponse.json(
      { error: '投稿の取得に失敗しました' },
      { status: 500 }
    )
  }
}

// 新しい投稿を作成
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, category, comment, latitude, longitude } = body

    // バリデーション
    if (!title || !category || !comment || latitude === undefined || longitude === undefined) {
      return NextResponse.json(
        { error: '必要な情報が不足しています' },
        { status: 400 }
      )
    }

    const post = await prisma.post.create({
      data: {
        title,
        category,
        comment,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude)
      }
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error('投稿作成エラー:', error)
    return NextResponse.json(
      { error: '投稿の作成に失敗しました' },
      { status: 500 }
    )
  }
} 