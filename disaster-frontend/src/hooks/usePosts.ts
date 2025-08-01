import { useState, useEffect } from 'react'
import { postApi } from '@/lib/apis/postApi'
import { Post } from '@/types'

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPosts = async () => {
    try {
      const data = await postApi.getPosts()
      setPosts(data)
      setError(null)
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

  const createPost = async (postData: {
    title: string
    category: string
    comment: string
    latitude: number
    longitude: number
  }) => {
    try {
      await postApi.createPost(postData)
      await fetchPosts() // 投稿一覧を再取得
      return true
    } catch (error) {
      console.error('投稿作成エラー:', error)
      throw error
    }
  }

  const updatePost = async (postData: {
    id: number
    title: string
    category: string
    comment: string
  }) => {
    try {
      await postApi.updatePost(postData)
      await fetchPosts() // 投稿一覧を再取得
      return true
    } catch (error) {
      console.error('投稿更新エラー:', error)
      throw error
    }
  }

  const deletePost = async (id: number) => {
    try {
      await postApi.deletePost(id)
      await fetchPosts() // 投稿一覧を再取得
      return true
    } catch (error) {
      console.error('投稿削除エラー:', error)
      throw error
    }
  }

  const likePost = async (id: number) => {
    try {
      await postApi.likePost(id)
      await fetchPosts() // 投稿一覧を再取得
      return true
    } catch (error) {
      console.error('いいねエラー:', error)
      throw error
    }
  }

  return {
    posts,
    isLoading,
    error,
    fetchPosts,
    createPost,
    updatePost,
    deletePost,
    likePost
  }
} 