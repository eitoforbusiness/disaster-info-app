const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

// APIクライアントの基本設定
const apiClient = {
  baseURL: API_BASE_URL,
  
  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
    }

    return response.json()
  },

  // GET リクエスト
  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' })
  },

  // POST リクエスト
  async post<T>(endpoint: string, data: Record<string, unknown>): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  // PUT リクエスト
  async put<T>(endpoint: string, data: Record<string, unknown>): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },

  // DELETE リクエスト
  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' })
  },
}

// 型定義
export interface DisasterInfo {
  id: string
  title: string
  description: string
  severity: 'high' | 'medium' | 'low'
  timestamp: string
  location: string
  type: 'earthquake' | 'tsunami' | 'volcano' | 'typhoon' | 'rain' | 'wind' | 'other'
}

export interface Post {
  id: number
  title: string
  category: string
  comment: string
  latitude: number
  longitude: number
  likes: number
  createdAt: string
  updatedAt: string
}

// API関数
export const disasterAPI = {
  // 災害情報を取得
  async getDisasterInfo(): Promise<DisasterInfo[]> {
    return apiClient.get<DisasterInfo[]>('/api/disaster-info')
  },

  // 投稿一覧を取得
  async getPosts(): Promise<Post[]> {
    return apiClient.get<Post[]>('/api/posts')
  },

  // 投稿を作成
  async createPost(data: {
    title: string
    category: string
    comment: string
    latitude: number
    longitude: number
  }): Promise<Post> {
    return apiClient.post<Post>('/api/posts', data)
  },

  // 投稿を更新
  async updatePost(data: {
    id: number
    title: string
    category: string
    comment: string
  }): Promise<Post> {
    return apiClient.put<Post>('/api/posts', data)
  },

  // 投稿を削除
  async deletePost(id: number): Promise<{ message: string }> {
    return apiClient.delete<{ message: string }>(`/api/posts/${id}`)
  },

  // 投稿にいいね
  async likePost(id: number): Promise<Post> {
    return apiClient.post<Post>(`/api/posts/${id}/like`, {})
  },
}

// ヘルスチェック
export const healthAPI = {
  async check(): Promise<{ status: string; timestamp: string }> {
    return apiClient.get<{ status: string; timestamp: string }>('/health')
  },
} 