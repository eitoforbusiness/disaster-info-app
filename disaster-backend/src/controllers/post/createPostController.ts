import { Request, Response } from 'express'
import { PostService } from '../../services/postService'
import { validateCreatePostData } from '../../utils/validationUtils'
import { handleControllerError, createValidationError } from '../../utils/errorUtils'

export class CreatePostController {
  // 投稿作成
  static async createPost(req: Request, res: Response) {
    try {
      const validation = validateCreatePostData(req.body)
      if (!validation.isValid) {
        throw createValidationError(validation.error)
      }

      const { title, category, comment, latitude, longitude } = req.body

      const post = await PostService.createPost({
        title,
        category,
        comment,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude)
      })

      res.status(201).json(post)
    } catch (error) {
      handleControllerError(error, res, '投稿作成')
    }
  }
} 