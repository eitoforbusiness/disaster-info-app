export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
  timestamp: string
}

export class ResponseUtils {
  // 成功レスポンス
  static success<T>(data: T, message?: string): ApiResponse<T> {
    return {
      success: true,
      data,
      message,
      timestamp: new Date().toISOString()
    }
  }

  // エラーレスポンス
  static error(message: string, error?: string): ApiResponse {
    return {
      success: false,
      message,
      error,
      timestamp: new Date().toISOString()
    }
  }

  // ページネーション付きレスポンス
  static paginated<T>(
    data: T[],
    page: number,
    limit: number,
    total: number,
    message?: string
  ): ApiResponse<{
    data: T[]
    pagination: {
      page: number
      limit: number
      total: number
      totalPages: number
    }
  }> {
    return {
      success: true,
      data: {
        data,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      },
      message,
      timestamp: new Date().toISOString()
    }
  }
} 