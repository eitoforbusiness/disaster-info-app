import { Router } from 'express'
import { GetEarthquakeInfoController } from '../controllers/disaster/getEarthquakeInfoController'
import { GetTsunamiInfoController } from '../controllers/disaster/getTsunamiInfoController'

const router = Router()

// 地震情報取得
router.get('/earthquake-info', GetEarthquakeInfoController.getEarthquakeInfo)

// 津波情報取得
router.get('/tsunami-info', GetTsunamiInfoController.getTsunamiInfo)

export default router 