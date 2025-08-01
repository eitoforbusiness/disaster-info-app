import { useMapEvents } from 'react-leaflet'

interface MapClickHandlerProps {
  onLocationSelect?: (lat: number, lng: number) => void
}

export default function MapClickHandler({ onLocationSelect }: MapClickHandlerProps) {
  useMapEvents({
    click: (e) => {
      if (onLocationSelect) {
        onLocationSelect(e.latlng.lat, e.latlng.lng)
      }
    },
  })
  return null
} 