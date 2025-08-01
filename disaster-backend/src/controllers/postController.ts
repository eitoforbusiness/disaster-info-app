import { Request, Response } from 'express'
import { PostService } from '../services/postService'

export class PostController {
  // 投稿一覧取得
  static async getAllPosts(req: Request, res: Response) {
    try {
      const posts = await PostService.getAllPosts()
      res.json(posts)
    } catch (error) {
      console.error('投稿取得エラー:', error)
      res.status(500).json({ error: '投稿の取得に失敗しました' })
    }
  }

  // 投稿作成
  static async createPost(req: Request, res: Response) {
    try {
      const { title, category, comment, latitude, longitude } = req.body

      if (!title || !category || !comment || latitude === undefined || longitude === undefined) {
        return res.status(400).json({ error: '必要な情報が不足しています' })
      }

      const post = await PostService.createPost({
        title,
        category,
        comment,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude)
      })

      res.status(201).json(post)
    } catch (error) {
      console.error('投稿作成エラー:', error)
      res.status(500).json({ error: '投稿の作成に失敗しました' })
    }
  }

  // 投稿更新
  static async updatePost(req: Request, res: Response) {
    try {
      const { id, title, category, comment } = req.body

      if (!id || !title || !category || !comment) {
        return res.status(400).json({ error: '必要な情報が不足しています' })
      }

      const post = await PostService.updatePost({
        id: parseInt(id),
        title,
        category,
        comment
      })

      res.json(post)
    } catch (error) {
      console.error('投稿更新エラー:', error)
      res.status(500).json({ error: '投稿の更新に失敗しました' })
    }
  }

  // 投稿削除
  static async deletePost(req: Request, res: Response) {
    try {
      const { id } = req.params

      if (!id) {
        return res.status(400).json({ error: '投稿IDが必要です' })
      }

      await PostService.deletePost(parseInt(id))

      res.json({ message: '投稿を削除しました' })
    } catch (error) {
      console.error('投稿削除エラー:', error)
      res.status(500).json({ error: '投稿の削除に失敗しました' })
    }
  }

  // いいね機能
  static async likePost(req: Request, res: Response) {
    try {
      const { id } = req.params

      if (!id) {
        return res.status(400).json({ error: '投稿IDが必要です' })
      }

      const post = await PostService.likePost(parseInt(id))

      res.json(post)
    } catch (error) {
      console.error('いいねエラー:', error)
      res.status(500).json({ error: 'いいねの処理に失敗しました' })
    }
  }
} 