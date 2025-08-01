import { Router } from 'express'

const router = Router()

// ヘルスチェック
router.get('/', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

export default router 