// 災害情報の型定義
export interface DisasterInfo {
  id: string
  title: string
  description: string
  severity: 'high' | 'medium' | 'low'
  timestamp: string
  location: string
  type: 'earthquake' | 'tsunami' | 'volcano' | 'typhoon' | 'rain' | 'wind' | 'other'
}

// 投稿の型定義
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

// 投稿作成用の型定義
export interface CreatePostData {
  title: string
  category: string
  comment: string
  latitude: number
  longitude: number
}

// 投稿更新用の型定義
export interface UpdatePostData {
  id: number
  title: string
  category: string
  comment: string
}

// APIレスポンスの型定義
export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
} 