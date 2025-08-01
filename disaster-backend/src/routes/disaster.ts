import { Router } from 'express'
import { GetDisasterInfoController } from '../controllers/disaster/getDisasterInfoController'

const router = Router()

// 災害情報取得
router.get('/disaster-info', GetDisasterInfoController.getDisasterInfo)

export default router 