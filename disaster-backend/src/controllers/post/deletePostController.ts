import { Request, Response } from 'express'
import { PostService } from '../../services/postService'
import { handleControllerError, createValidationError } from '../../utils/errorUtils'

export class DeletePostController {
  // 投稿削除
  static async deletePost(req: Request, res: Response) {
    try {
      const { id } = req.params

      if (!id || isNaN(parseInt(id))) {
        throw createValidationError('有効な投稿IDが必要です')
      }

      await PostService.deletePost(parseInt(id))

      res.json({ message: '投稿を削除しました' })
    } catch (error) {
      handleControllerError(error, res, '投稿削除')
    }
  }
} 