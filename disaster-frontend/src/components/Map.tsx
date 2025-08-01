'use client'

import { useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { Post } from '@/types'
import MapClickHandler from './MapClickHandler'
import MapMarkers from './MapMarkers'

// Leafletのデフォルトアイコンを修正
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: () => string })._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

interface MapProps {
  posts: Post[]
  onLocationSelect?: (lat: number, lng: number) => void
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
        <MapMarkers posts={posts} selectedLocation={selectedLocation} />
      </MapContainer>
    </div>
  )
} 