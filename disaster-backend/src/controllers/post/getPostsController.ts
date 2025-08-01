import { Request, Response } from 'express'
import { PostService } from '../../services/postService'
import { handleControllerError } from '../../utils/errorUtils'

export class GetPostsController {
  // 投稿一覧取得
  static async getAllPosts(req: Request, res: Response) {
    try {
      const posts = await PostService.getAllPosts()
      res.json(posts)
    } catch (error) {
      handleControllerError(error, res, '投稿取得')
    }
  }

  // 個別投稿取得
  static async getPostById(req: Request, res: Response) {
    try {
      const { id } = req.params
      const post = await PostService.getPostById(parseInt(id))
      if (!post) {
        return res.status(404).json({ message: '投稿が見つかりません' })
      }
      res.json(post)
    } catch (error) {
      handleControllerError(error, res, '投稿取得')
    }
  }
} 