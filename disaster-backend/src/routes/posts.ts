import { Router } from 'express'
import { GetPostsController } from '../controllers/post/getPostsController'
import { CreatePostController } from '../controllers/post/createPostController'
import { UpdatePostController } from '../controllers/post/updatePostController'
import { DeletePostController } from '../controllers/post/deletePostController'
import { LikePostController } from '../controllers/post/likePostController'

const router = Router()

// 投稿一覧取得
router.get('/', GetPostsController.getAllPosts)

// 個別投稿取得
router.get('/:id', GetPostsController.getPostById)

// 投稿作成
router.post('/', CreatePostController.createPost)

// 投稿更新
router.put('/:id', UpdatePostController.updatePost)

// 投稿削除
router.delete('/:id', DeletePostController.deletePost)

// いいね機能
router.post('/:id/likes', LikePostController.likePost)

export default router 