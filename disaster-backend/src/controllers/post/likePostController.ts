import { Request, Response } from 'express'
import { PostService } from '../../services/postService'
import { handleControllerError, createValidationError } from '../../utils/errorUtils'

export class LikePostController {
  // いいね機能
  static async likePost(req: Request, res: Response) {
    try {
      const { id } = req.params

      if (!id || isNaN(parseInt(id))) {
        throw createValidationError('有効な投稿IDが必要です')
      }

      const post = await PostService.likePost(parseInt(id))

      res.json(post)
    } catch (error) {
      handleControllerError(error, res, 'いいね処理')
    }
  }
} 