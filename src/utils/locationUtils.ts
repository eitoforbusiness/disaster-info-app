// 現在地を取得する関数
export function getCurrentLocation(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('位置情報が利用できません'))
      return
    }

    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

// 位置情報の取得を試行する関数
export async function tryGetCurrentLocation(): Promise<{ lat: number; lng: number } | null> {
  try {
    const position = await getCurrentLocation()
    return {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    }
  } catch (error) {
    console.error('位置情報の取得に失敗:', error)
    return null
  }
} 