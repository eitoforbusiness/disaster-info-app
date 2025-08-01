import { CreatePostData, UpdatePostData } from '../types'

export interface ValidationResult {
  isValid: boolean
  error: string
}

// 投稿作成データのバリデーション
export function validateCreatePostData(data: any): ValidationResult {
  if (!data.title || typeof data.title !== 'string' || data.title.trim().length === 0) {
    return { isValid: false, error: 'タイトルが必要です' }
  }

  if (!data.category || typeof data.category !== 'string' || data.category.trim().length === 0) {
    return { isValid: false, error: 'カテゴリが必要です' }
  }

  if (!data.comment || typeof data.comment !== 'string' || data.comment.trim().length === 0) {
    return { isValid: false, error: 'コメントが必要です' }
  }

  if (typeof data.latitude !== 'number' || data.latitude < -90 || data.latitude > 90) {
    return { isValid: false, error: '有効な緯度が必要です' }
  }

  if (typeof data.longitude !== 'number' || data.longitude < -180 || data.longitude > 180) {
    return { isValid: false, error: '有効な経度が必要です' }
  }

  return { isValid: true, error: '' }
}

// 投稿更新データのバリデーション
export function validateUpdatePostData(data: any): ValidationResult {
  if (!data.id || typeof data.id !== 'number' || data.id <= 0) {
    return { isValid: false, error: '有効な投稿IDが必要です' }
  }

  if (!data.title || typeof data.title !== 'string' || data.title.trim().length === 0) {
    return { isValid: false, error: 'タイトルが必要です' }
  }

  if (!data.category || typeof data.category !== 'string' || data.category.trim().length === 0) {
    return { isValid: false, error: 'カテゴリが必要です' }
  }

  if (!data.comment || typeof data.comment !== 'string' || data.comment.trim().length === 0) {
    return { isValid: false, error: 'コメントが必要です' }
  }

  return { isValid: true, error: '' }
} 