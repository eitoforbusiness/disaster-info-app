import { Request, Response } from 'express'
import { fetchEarthquakeInfo } from '../../services/earthquakeService'
import { handleControllerError } from '../../utils/errorUtils'

export class GetEarthquakeInfoController {
  // 地震情報取得
  static async getEarthquakeInfo(req: Request, res: Response) {
    try {
      const earthquakeInfo = await fetchEarthquakeInfo()
      res.json(earthquakeInfo)
    } catch (error) {
      handleControllerError(error, res, '地震情報取得')
    }
  }
} 