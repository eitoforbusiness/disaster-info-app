import { apiClient } from '../apiClient'
import { DisasterInfo } from '@/types'

export class TsunamiApi {
  // 津波情報を取得
  static async getTsunamiInfo(): Promise<DisasterInfo[]> {
    return apiClient.get<DisasterInfo[]>('/api/tsunami-info')
  }
}

export const tsunamiApi = TsunamiApi 