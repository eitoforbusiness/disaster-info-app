import { Router } from 'express'
import { DisasterController } from '../controllers/disasterController'

const router = Router()

// 災害情報取得
router.get('/disaster-info', DisasterController.getDisasterInfo)

export default router 