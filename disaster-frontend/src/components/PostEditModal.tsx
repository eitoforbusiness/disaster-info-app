'use client'

import { useState } from 'react'
import { postApi } from '@/lib/apis/postApi'
import { Post } from '@/types'

interface PostEditModalProps {
  post: Post | null
  isOpen: boolean
  onClose: () => void
  onUpdate: () => void
}

const CATEGORIES = [
  '通行止め',
  '陥没',
  '避難所混雑',
  '道路損壊',
  '建物損壊',
  'その他'
]

export default function PostEditModal({ post, isOpen, onClose, onUpdate }: PostEditModalProps) {
  const [title, setTitle] = useState(post?.title || '')
  const [category, setCategory] = useState(post?.category || '')
  const [comment, setComment] = useState(post?.comment || '')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  // 投稿が変更されたときにフォームを更新
  useState(() => {
    if (post) {
      setTitle(post.title)
      setCategory(post.category)
      setComment(post.comment)
    }
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!post || !title || !category || !comment) {
      setError('すべての項目を入力してください')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      await postApi.updatePost({
        id: post.id,
        title,
        category,
        comment,
      })

      onUpdate()
      onClose()
    } catch (error) {
      setError(error instanceof Error ? error.message : '投稿の更新に失敗しました')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!post) return

    if (!confirm('この投稿を削除しますか？')) {
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      await postApi.deletePost(post.id)

      onUpdate()
      onClose()
    } catch (error) {
      setError(error instanceof Error ? error.message : '投稿の削除に失敗しました')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen || !post) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">投稿を編集</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="edit-title" className="block text-sm font-medium text-gray-700 mb-1">
              タイトル *
            </label>
            <input
              type="text"
              id="edit-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="edit-category" className="block text-sm font-medium text-gray-700 mb-1">
              カテゴリ *
            </label>
            <select
              id="edit-category"
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
            <label htmlFor="edit-comment" className="block text-sm font-medium text-gray-700 mb-1">
              詳細 *
            </label>
            <textarea
              id="edit-comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex gap-2 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isSubmitting ? '更新中...' : '更新'}
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={isSubmitting}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
            >
              削除
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 