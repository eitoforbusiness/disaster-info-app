import { Request, Response } from 'express'
import { handleControllerError } from '../../utils/errorUtils'

export class HealthCheckController {
  // ヘルスチェック
  static async healthCheck(req: Request, res: Response) {
    try {
      res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
      })
    } catch (error) {
      handleControllerError(error, res, 'ヘルスチェック')
    }
  }
} 