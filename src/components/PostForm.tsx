'use client'

import { useState, useEffect } from 'react'

interface PostFormProps {
  onPostCreated: () => void
  selectedLocation?: { lat: number; lng: number } | null
}

const CATEGORIES = [
  '通行止め',
  '陥没',
  '避難所混雑',
  '道路損壊',
  '建物損壊',
  'その他'
]

export default function PostForm({ onPostCreated, selectedLocation }: PostFormProps) {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [comment, setComment] = useState('')
  const [latitude, setLatitude] = useState<number | null>(null)
  const [longitude, setLongitude] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // 選択された位置情報を更新
  useEffect(() => {
    if (selectedLocation) {
      setLatitude(selectedLocation.lat)
      setLongitude(selectedLocation.lng)
    }
  }, [selectedLocation])

  // 現在地を取得
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError('位置情報が利用できません')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
        setError('')
      },
      (error) => {
        setError('位置情報の取得に失敗しました')
        console.error('位置情報エラー:', error)
      }
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title || !category || !comment) {
      setError('すべての項目を入力してください')
      return
    }

    if (latitude === null || longitude === null) {
      setError('位置情報を設定してください')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          category,
          comment,
          latitude,
          longitude,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || '投稿に失敗しました')
      }

      // フォームをリセット
      setTitle('')
      setCategory('')
      setComment('')
      setLatitude(null)
      setLongitude(null)
      setSuccess('投稿が完了しました！')
      
      // 親コンポーネントに通知
      onPostCreated()

      // 3秒後に成功メッセージを消す
      setTimeout(() => setSuccess(''), 3000)
    } catch (error) {
      setError(error instanceof Error ? error.message : '投稿に失敗しました')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">災害情報を投稿</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            タイトル *
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="例: 〇〇通りが通行止め"
            required
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            カテゴリ *
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">カテゴリを選択</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
            詳細 *
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="詳細な状況を教えてください"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            位置情報 *
          </label>
          <div className="flex gap-2 mb-2">
            <button
              type="button"
              onClick={getCurrentLocation}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              現在地を取得
            </button>
            <span className="text-sm text-gray-500 self-center">
              または地図をクリックして位置を選択
            </span>
          </div>
          
          {latitude !== null && longitude !== null && (
            <div className="text-sm text-gray-600">
              緯度: {latitude.toFixed(6)}, 経度: {longitude.toFixed(6)}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? '投稿中...' : '投稿する'}
        </button>
      </form>
    </div>
  )
} 