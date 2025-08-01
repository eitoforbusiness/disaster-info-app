import { Location } from '@/types'

export interface ValidationResult {
  isValid: boolean
  error: string
}

// 投稿フォームのバリデーション
export function validatePostForm(data: {
  title: string
  category: string
  comment: string
  location: Location | null
}): ValidationResult {
  if (!data.title.trim()) {
    return { isValid: false, error: 'タイトルを入力してください' }
  }

  if (!data.category) {
    return { isValid: false, error: 'カテゴリを選択してください' }
  }

  if (!data.comment.trim()) {
    return { isValid: false, error: '詳細を入力してください' }
  }

  if (!data.location) {
    return { isValid: false, error: '位置情報を設定してください' }
  }

  return { isValid: true, error: '' }
}

// 位置情報のバリデーション
export function validateLocation(location: Location | null): ValidationResult {
  if (!location) {
    return { isValid: false, error: '位置情報が必要です' }
  }

  if (location.lat < -90 || location.lat > 90) {
    return { isValid: false, error: '緯度が無効です' }
  }

  if (location.lng < -180 || location.lng > 180) {
    return { isValid: false, error: '経度が無効です' }
  }

  return { isValid: true, error: '' }
} 