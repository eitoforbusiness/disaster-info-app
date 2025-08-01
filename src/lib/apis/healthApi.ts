import { apiClient } from '../apiClient'
import { HealthStatus } from '@/types'

export class HealthApi {
  // ヘルスチェック
  static async check(): Promise<HealthStatus> {
    return apiClient.get<HealthStatus>('/health')
  }
}

export const healthApi = HealthApi 