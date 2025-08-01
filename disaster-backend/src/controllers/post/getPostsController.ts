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
} 