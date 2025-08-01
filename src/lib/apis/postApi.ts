import { apiClient } from '../apiClient'
import { Post, CreatePostData, UpdatePostData } from '@/types'

export class PostApi {
  // 投稿一覧を取得
  static async getPosts(): Promise<Post[]> {
    return apiClient.get<Post[]>('/api/posts')
  }

  // 投稿を作成
  static async createPost(data: CreatePostData): Promise<Post> {
    return apiClient.post<Post>('/api/posts', data)
  }

  // 投稿を更新
  static async updatePost(data: UpdatePostData): Promise<Post> {
    return apiClient.put<Post>('/api/posts', data)
  }

  // 投稿を削除
  static async deletePost(id: number): Promise<{ message: string }> {
    return apiClient.delete<{ message: string }>(`/api/posts/${id}`)
  }

  // 投稿にいいね
  static async likePost(id: number): Promise<Post> {
    return apiClient.post<Post>(`/api/posts/${id}/like`, {})
  }
}

export const postApi = PostApi 