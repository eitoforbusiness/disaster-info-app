import { prisma } from '../lib/database'

export interface CreatePostData {
  title: string
  category: string
  comment: string
  latitude: number
  longitude: number
}

export interface UpdatePostData {
  id: number
  title: string
  category: string
  comment: string
}

export class PostService {
  // 投稿一覧取得
  static async getAllPosts() {
    return await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      take: 50
    })
  }

  // 投稿作成
  static async createPost(data: CreatePostData) {
    return await prisma.post.create({
      data: {
        title: data.title,
        category: data.category,
        comment: data.comment,
        latitude: data.latitude,
        longitude: data.longitude
      }
    })
  }

  // 投稿更新
  static async updatePost(data: UpdatePostData) {
    return await prisma.post.update({
      where: { id: data.id },
      data: {
        title: data.title,
        category: data.category,
        comment: data.comment
      }
    })
  }

  // 投稿削除
  static async deletePost(id: number) {
    return await prisma.post.delete({
      where: { id }
    })
  }

  // いいね機能
  static async likePost(id: number) {
    return await prisma.post.update({
      where: { id },
      data: {
        likes: {
          increment: 1
        }
      }
    })
  }
} 