'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { usePosts } from '@/hooks/usePosts'
import { Post } from '@/types'
import PostForm from '@/components/PostForm'
import PostEditModal from '@/components/PostEditModal'
import PostList from '@/components/PostList'
import LoadingSpinner from '@/components/LoadingSpinner'

// Leafletコンポーネントを動的インポート（SSRエラー回避）
const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">地図を読み込み中...</div>
})

export default function MapPage() {
  const { posts, isLoading, error, createPost, updatePost } = usePosts()
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [editingPost, setEditingPost] = useState<Post | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  // 投稿作成後の処理
  const handlePostCreated = async (postData: {
    title: string
    category: string
    comment: string
    latitude: number
    longitude: number
  }) => {
    try {
      await createPost(postData)
    } catch (error) {
      console.error('投稿作成エラー:', error)
    }
  }

  // 地図での位置選択
  const handleLocationSelect = (lat: number, lng: number) => {
    setSelectedLocation({ lat, lng })
  }

  // 投稿編集モーダルを開く
  const handleEditPost = (post: Post) => {
    setEditingPost(post)
    setIsEditModalOpen(true)
  }

  // 投稿編集モーダルを閉じる
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false)
    setEditingPost(null)
  }

  // 投稿更新後の処理
  const handlePostUpdated = async (postData: {
    id: number
    title: string
    category: string
    comment: string
  }) => {
    try {
      await updatePost(postData)
      handleCloseEditModal()
    } catch (error) {
      console.error('投稿更新エラー:', error)
    }
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* ヘッダー */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">災害情報マップ</h1>
          <p className="text-gray-600">地図上で災害情報を確認・投稿できます</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 地図エリア */}
          <div className="lg:col-span-2">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">地図</h2>
              <Map 
                posts={posts} 
                onLocationSelect={handleLocationSelect}
              />
            </div>
          </div>

          {/* 投稿フォーム */}
          <div className="lg:col-span-1">
            <PostForm 
              onPostCreated={handlePostCreated}
              selectedLocation={selectedLocation}
            />
          </div>
        </div>

        {/* 投稿一覧 */}
        <PostList 
          posts={posts}
          onEditPost={handleEditPost}
        />

        {/* 投稿編集モーダル */}
        <PostEditModal
          post={editingPost}
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          onUpdate={handlePostUpdated}
        />
      </div>
    </div>
  )
} 