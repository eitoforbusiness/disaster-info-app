import { useState, useEffect } from 'react'
import { earthquakeApi } from '@/lib/apis/earthquakeApi'
import { DisasterInfo } from '@/types'

// サンプル地震データ
const sampleEarthquakeData: DisasterInfo[] = [
  {
    id: '1',
    title: '震源・震度情報 - 震度4',
    description: '東京都でマグニチュード5.2、震度4の地震が発生しました。深さ: 10km',
    severity: 'medium',
    timestamp: '2024-01-15T10:30:00Z',
    location: '東京都',
    type: 'earthquake'
  },
  {
    id: '2',
    title: '震源・震度情報 - 震度3',
    description: '神奈川県でマグニチュード4.8、震度3の地震が発生しました。深さ: 15km',
    severity: 'medium',
    timestamp: '2024-01-15T09:15:00Z',
    location: '神奈川県',
    type: 'earthquake'
  }
]

export function useEarthquakeInfo() {
  const [earthquakeInfo, setEarthquakeInfo] = useState<DisasterInfo[]>(sampleEarthquakeData)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  const fetchEarthquakeInfo = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await earthquakeApi.getEarthquakeInfo()
      setEarthquakeInfo(data)
      setLastUpdated(new Date())
    } catch (error) {
      console.error('地震情報の取得に失敗:', error)
      setError('地震情報の取得に失敗しました')
      // エラー時はサンプルデータを表示
      setEarthquakeInfo(sampleEarthquakeData)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchEarthquakeInfo()
    
    // 5分ごとに更新
    const interval = setInterval(fetchEarthquakeInfo, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  // 次回更新時刻を計算
  const nextUpdate = new Date(lastUpdated.getTime() + 5 * 60 * 1000)

  return {
    earthquakeInfo,
    isLoading,
    error,
    lastUpdated,
    nextUpdate,
    refetch: fetchEarthquakeInfo
  }
} 