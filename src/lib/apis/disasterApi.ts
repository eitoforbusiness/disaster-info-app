import { apiClient } from '../apiClient'
import { DisasterInfo } from '@/types'

export class DisasterApi {
  // 災害情報を取得
  static async getDisasterInfo(): Promise<DisasterInfo[]> {
    return apiClient.get<DisasterInfo[]>('/api/disaster-info')
  }
}

export const disasterApi = DisasterApi 