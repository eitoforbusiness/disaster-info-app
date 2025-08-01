import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { postApi } from '@/lib/apis/postApi'
import { Post, CreatePostData, UpdatePostData } from '@/types'

export function usePosts() {
  const queryClient = useQueryClient()

  const {
    data: posts = [],
    isLoading,
    error,
    refetch: fetchPosts
  } = useQuery({
    queryKey: ['posts'],
    queryFn: postApi.getPosts,
    staleTime: 30 * 1000, // 30秒間はデータを新鮮とみなす
    retry: 1,
  })

  // 投稿作成のmutation
  const createPostMutation = useMutation({
    mutationFn: postApi.createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
    onError: (error) => {
      console.error('投稿作成エラー:', error)
    }
  })

  // 投稿更新のmutation
  const updatePostMutation = useMutation({
    mutationFn: postApi.updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
    onError: (error) => {
      console.error('投稿更新エラー:', error)
    }
  })

  // 投稿削除のmutation
  const deletePostMutation = useMutation({
    mutationFn: postApi.deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
    onError: (error) => {
      console.error('投稿削除エラー:', error)
    }
  })

  // いいねのmutation
  const likePostMutation = useMutation({
    mutationFn: postApi.likePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
    onError: (error) => {
      console.error('いいねエラー:', error)
    }
  })

  const createPost = async (postData: CreatePostData) => {
    try {
      await createPostMutation.mutateAsync(postData)
      return true
    } catch (error) {
      throw error
    }
  }

  const updatePost = async (postData: UpdatePostData) => {
    try {
      await updatePostMutation.mutateAsync(postData)
      return true
    } catch (error) {
      throw error
    }
  }

  const deletePost = async (id: number) => {
    try {
      await deletePostMutation.mutateAsync(id)
      return true
    } catch (error) {
      throw error
    }
  }

  const likePost = async (id: number) => {
    try {
      await likePostMutation.mutateAsync(id)
      return true
    } catch (error) {
      throw error
    }
  }

  return {
    posts,
    isLoading,
    error: error ? '投稿の取得に失敗しました' : null,
    fetchPosts,
    createPost,
    updatePost,
    deletePost,
    likePost,
    // mutationの状態も返す（必要に応じて）
    isCreating: createPostMutation.isPending,
    isUpdating: updatePostMutation.isPending,
    isDeleting: deletePostMutation.isPending,
    isLiking: likePostMutation.isPending,
  }
} 