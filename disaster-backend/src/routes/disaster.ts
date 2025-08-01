import { Router } from 'express'
import { GetEarthquakeInfoController } from '../controllers/disaster/getEarthquakeInfoController'
import { GetTsunamiInfoController } from '../controllers/disaster/getTsunamiInfoController'

const router = Router()

// 災害情報のベースパス
router.get('/disasters/earthquakes', GetEarthquakeInfoController.getEarthquakeInfo)
router.get('/disasters/tsunamis', GetTsunamiInfoController.getTsunamiInfo)

// 後方互換性のため残しておく（非推奨）
router.get('/earthquake-info', GetEarthquakeInfoController.getEarthquakeInfo)
router.get('/tsunami-info', GetTsunamiInfoController.getTsunamiInfo)

export default router 