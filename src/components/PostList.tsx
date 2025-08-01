import { Post } from '@/types'

interface PostListProps {
  posts: Post[]
  onEditPost: (post: Post) => void
}

export default function PostList({ posts, onEditPost }: PostListProps) {
  return (
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
                  <button
                    onClick={() => onEditPost(post)}
                    className="ml-2 px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    編集
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 