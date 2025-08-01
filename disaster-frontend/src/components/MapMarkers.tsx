import { Marker, Popup } from 'react-leaflet'
import { Post } from '@/types'
import { createPostMarkerIcon, createSelectedLocationMarkerIcon } from '@/utils/markerUtils'

interface MapMarkersProps {
  posts: Post[]
  selectedLocation: [number, number] | null
}

export default function MapMarkers({ posts, selectedLocation }: MapMarkersProps) {
  return (
    <>
      {/* 投稿のマーカーを表示 */}
      {posts.map((post) => (
        <Marker
          key={post.id}
          position={[post.latitude, post.longitude]}
          icon={createPostMarkerIcon(post.category)}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-bold text-lg">{post.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{post.category}</p>
              <p className="text-sm">{post.comment}</p>
              <p className="text-xs text-gray-500 mt-2">
                {new Date(post.createdAt).toLocaleString('ja-JP')}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
      
      {/* 選択された位置のマーカー */}
      {selectedLocation && (
        <Marker
          position={selectedLocation}
          icon={createSelectedLocationMarkerIcon()}
        >
          <Popup>
            <div className="p-2">
              <p className="text-sm">選択された位置</p>
              <p className="text-xs text-gray-500">
                {selectedLocation[0].toFixed(6)}, {selectedLocation[1].toFixed(6)}
              </p>
            </div>
          </Popup>
        </Marker>
      )}
    </>
  )
} 