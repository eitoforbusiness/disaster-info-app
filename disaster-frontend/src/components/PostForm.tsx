'use client'

import { useState, useEffect } from 'react'
import { postApi } from '@/lib/apis/postApi'
import { Location } from '@/types'
import { POST_CATEGORIES } from '@/constants/categories'
import { validatePostForm } from '@/utils/validationUtils'
import LocationInput from './LocationInput'

interface PostFormProps {
  onPostCreated: (postData: {
    title: string
    category: string
    comment: string
    latitude: number
    longitude: number
  }) => void
  selectedLocation?: Location | null
}

export default function PostForm({ onPostCreated, selectedLocation }: PostFormProps) {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [comment, setComment] = useState('')
  const [location, setLocation] = useState<Location | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // 選択された位置情報を更新
  useEffect(() => {
    if (selectedLocation) {
      setLocation(selectedLocation)
    }
  }, [selectedLocation])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // バリデーション
    const validation = validatePostForm({ title, category, comment, location })
    if (!validation.isValid) {
      setError(validation.error)
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      const postData = {
        title,
        category,
        comment,
        latitude: location!.lat,
        longitude: location!.lng,
      }

      await postApi.createPost(postData)

      // フォームをリセット
      setTitle('')
      setCategory('')
      setComment('')
      setLocation(null)
      setSuccess('投稿が完了しました！')
      
      // 親コンポーネントに通知
      onPostCreated(postData)

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
            {POST_CATEGORIES.map((cat) => (
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

        <LocationInput
          selectedLocation={selectedLocation}
          onLocationChange={setLocation}
          error={error}
          setError={setError}
        />

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