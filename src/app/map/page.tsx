'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import PostForm from '@/components/PostForm'

// Leafletコンポーネントを動的インポート（SSRエラー回避）
const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">地図を読み込み中...</div>
})

interface Post {
  id: number
  title: string
  category: string
  comment: string
  latitude: number
  longitude: number
  createdAt: string
}

export default function MapPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  // 投稿を取得
  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts')
      if (!response.ok) {
        throw new Error('投稿の取得に失敗しました')
      }
      const data = await response.json()
      setPosts(data)
    } catch (error) {
      setError('投稿の取得に失敗しました')
      console.error('投稿取得エラー:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  // 投稿作成後の処理
  const handlePostCreated = () => {
    fetchPosts()
  }

  // 地図での位置選択
  const handleLocationSelect = (lat: number, lng: number) => {
    setSelectedLocation({ lat, lng })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">読み込み中...</p>
          </div>
        </div>
      </div>
    )
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
        <div className="mt-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">最新の投稿</h2>
            {posts.length === 0 ? (
              <p className="text-gray-500 text-center py-8">まだ投稿がありません</p>
            ) : (
              <div className="space-y-4">
                {posts.slice(0, 10).map((post) => (
                  <div key={post.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{post.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="inline-block px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded">
                            {post.category}
                          </span>
                          <span className="text-sm text-gray-500">
                            {new Date(post.createdAt).toLocaleString('ja-JP')}
                          </span>
                        </div>
                        <p className="text-gray-700 mt-2">{post.comment}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          位置: {post.latitude.toFixed(4)}, {post.longitude.toFixed(4)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 