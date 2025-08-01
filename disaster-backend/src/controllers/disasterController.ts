import { Request, Response } from 'express'
import { fetchJMAWeatherInfo } from '../services/jmaService'

export class DisasterController {
  // 災害情報取得
  static async getDisasterInfo(req: Request, res: Response) {
    try {
      const disasterInfo = await fetchJMAWeatherInfo()
      res.json(disasterInfo)
    } catch (error) {
      console.error('災害情報取得エラー:', error)
      res.status(500).json({ error: '災害情報の取得に失敗しました' })
    }
  }
} 