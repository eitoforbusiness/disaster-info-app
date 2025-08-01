import { Router } from 'express'
import { GetPostsController } from '../controllers/post/getPostsController'
import { CreatePostController } from '../controllers/post/createPostController'
import { UpdatePostController } from '../controllers/post/updatePostController'
import { DeletePostController } from '../controllers/post/deletePostController'
import { LikePostController } from '../controllers/post/likePostController'

const router = Router()

// 投稿一覧取得
router.get('/', GetPostsController.getAllPosts)

// 投稿作成
router.post('/', CreatePostController.createPost)

// 投稿更新
router.put('/', UpdatePostController.updatePost)

// 投稿削除
router.delete('/:id', DeletePostController.deletePost)

// いいね機能
router.post('/:id/like', LikePostController.likePost)

export default router 