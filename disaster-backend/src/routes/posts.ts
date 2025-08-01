import { Router } from 'express'
import { PostController } from '../controllers/postController'

const router = Router()

// 投稿一覧取得
router.get('/', PostController.getAllPosts)

// 投稿作成
router.post('/', PostController.createPost)

// 投稿更新
router.put('/', PostController.updatePost)

// 投稿削除
router.delete('/:id', PostController.deletePost)

// いいね機能
router.post('/:id/like', PostController.likePost)

export default router 