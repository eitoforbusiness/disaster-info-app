import { Router } from 'express'
import { HealthCheckController } from '../controllers/health/healthCheckController'

const router = Router()

// ヘルスチェック
router.get('/', HealthCheckController.healthCheck)

export default router 