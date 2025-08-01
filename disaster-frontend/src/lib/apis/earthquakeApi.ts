import { apiClient } from '../apiClient'
import { DisasterInfo } from '@/types'

export class EarthquakeApi {
  // 地震情報を取得
  static async getEarthquakeInfo(): Promise<DisasterInfo[]> {
    return apiClient.get<DisasterInfo[]>('/api/earthquake-info')
  }
}

export const earthquakeApi = EarthquakeApi 