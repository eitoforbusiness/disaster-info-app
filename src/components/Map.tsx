'use client'

import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Leafletのデフォルトアイコンを修正
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: () => string })._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
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

interface MapProps {
  posts: Post[]
  onLocationSelect?: (lat: number, lng: number) => void
}

// 地図クリックイベントを処理するコンポーネント
function MapClickHandler({ onLocationSelect }: { onLocationSelect?: (lat: number, lng: number) => void }) {
  useMapEvents({
    click: (e) => {
      if (onLocationSelect) {
        onLocationSelect(e.latlng.lat, e.latlng.lng)
      }
    },
  })
  return null
}

// カテゴリに応じたアイコン色を取得
function getCategoryColor(category: string): string {
  switch (category) {
    case '通行止め':
      return '#ff4444'
    case '陥没':
      return '#ff8800'
    case '避難所混雑':
      return '#ffaa00'
    default:
      return '#3388ff'
  }
}

export default function Map({ posts, onLocationSelect }: MapProps) {
  const [selectedLocation, setSelectedLocation] = useState<[number, number] | null>(null)

  const handleLocationSelect = (lat: number, lng: number) => {
    setSelectedLocation([lat, lng])
    if (onLocationSelect) {
      onLocationSelect(lat, lng)
    }
  }

  return (
    <div className="w-full h-96 rounded-lg overflow-hidden">
      <MapContainer
        center={[35.6762, 139.6503]} // 東京
        zoom={10}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapClickHandler onLocationSelect={handleLocationSelect} />
        
        {/* 投稿のマーカーを表示 */}
        {posts.map((post) => (
          <Marker
            key={post.id}
            position={[post.latitude, post.longitude]}
            icon={L.divIcon({
              className: 'custom-marker',
              html: `<div style="background-color: ${getCategoryColor(post.category)}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white;"></div>`,
              iconSize: [20, 20],
              iconAnchor: [10, 10],
            })}
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
            icon={L.divIcon({
              className: 'selected-marker',
              html: '<div style="background-color: #00ff00; width: 25px; height: 25px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.3);"></div>',
              iconSize: [25, 25],
              iconAnchor: [12.5, 12.5],
            })}
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
      </MapContainer>
    </div>
  )
} 