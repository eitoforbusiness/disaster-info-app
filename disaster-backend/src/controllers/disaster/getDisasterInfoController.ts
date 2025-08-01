import { Request, Response } from 'express'
import { fetchJMAWeatherInfo } from '../../services/jmaService'
import { handleControllerError } from '../../utils/errorUtils'

export class GetDisasterInfoController {
  // 災害情報取得
  static async getDisasterInfo(req: Request, res: Response) {
    try {
      const disasterInfo = await fetchJMAWeatherInfo()
      res.json(disasterInfo)
    } catch (error) {
      handleControllerError(error, res, '災害情報取得')
    }
  }
} 