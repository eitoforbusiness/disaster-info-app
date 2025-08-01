import { useEffect } from 'react'
import { tryGetCurrentLocation } from '@/utils/locationUtils'
import { Location } from '@/types'

interface LocationInputProps {
  selectedLocation: Location | null
  onLocationChange: (location: Location | null) => void
  error: string
  setError: (error: string) => void
}

export default function LocationInput({ selectedLocation, onLocationChange, error, setError }: LocationInputProps) {
  // 選択された位置情報を更新
  useEffect(() => {
    if (selectedLocation) {
      onLocationChange(selectedLocation)
    }
  }, [selectedLocation, onLocationChange])

  // 現在地を取得
  const getCurrentLocation = async () => {
    const location = await tryGetCurrentLocation()
    if (location) {
      onLocationChange(location)
      setError('')
    } else {
      setError('位置情報の取得に失敗しました')
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        位置情報 *
      </label>
      <div className="flex gap-2 mb-2">
        <button
          type="button"
          onClick={getCurrentLocation}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          現在地を取得
        </button>
        <span className="text-sm text-gray-500 self-center">
          または地図をクリックして位置を選択
        </span>
      </div>
      
      {selectedLocation && (
        <div className="text-sm text-gray-600">
          緯度: {selectedLocation.lat.toFixed(6)}, 経度: {selectedLocation.lng.toFixed(6)}
        </div>
      )}
    </div>
  )
} 