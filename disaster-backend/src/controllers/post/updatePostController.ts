import { Request, Response } from 'express'
import { PostService } from '../../services/postService'
import { validateUpdatePostData } from '../../utils/validationUtils'
import { handleControllerError, createValidationError } from '../../utils/errorUtils'

export class UpdatePostController {
  // 投稿更新
  static async updatePost(req: Request, res: Response) {
    try {
      const validation = validateUpdatePostData(req.body)
      if (!validation.isValid) {
        throw createValidationError(validation.error)
      }

      const { id } = req.params
      const { title, category, comment } = req.body

      const post = await PostService.updatePost({
        id: parseInt(id),
        title,
        category,
        comment
      })

      res.json(post)
    } catch (error) {
      handleControllerError(error, res, '投稿更新')
    }
  }
} 