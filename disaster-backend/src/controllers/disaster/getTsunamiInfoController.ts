import { Request, Response } from 'express'
import { fetchTsunamiInfo } from '../../services/tsunamiService'
import { handleControllerError } from '../../utils/errorUtils'

export class GetTsunamiInfoController {
  // 津波情報取得
  static async getTsunamiInfo(req: Request, res: Response) {
    try {
      const tsunamiInfo = await fetchTsunamiInfo()
      res.json(tsunamiInfo)
    } catch (error) {
      handleControllerError(error, res, '津波情報取得')
    }
  }
} 