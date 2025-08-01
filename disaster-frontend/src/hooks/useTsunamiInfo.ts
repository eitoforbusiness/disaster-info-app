import { useState, useEffect } from 'react'
import { tsunamiApi } from '@/lib/apis/tsunamiApi'
import { DisasterInfo } from '@/types'

// サンプル津波データ
const sampleTsunamiData: DisasterInfo[] = [
  {
    id: '1',
    title: '津波注意報',
    description: '太平洋沿岸に津波注意報が発表されました。',
    severity: 'high',
    timestamp: '2024-01-15T10:30:00Z',
    location: '太平洋沿岸',
    type: 'tsunami'
  },
  {
    id: '2',
    title: '津波警報',
    description: '東北地方太平洋沿岸に津波警報が発表されました。',
    severity: 'high',
    timestamp: '2024-01-15T09:15:00Z',
    location: '東北地方太平洋沿岸',
    type: 'tsunami'
  }
]

export function useTsunamiInfo() {
  const [tsunamiInfo, setTsunamiInfo] = useState<DisasterInfo[]>(sampleTsunamiData)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  const fetchTsunamiInfo = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await tsunamiApi.getTsunamiInfo()
      setTsunamiInfo(data)
      setLastUpdated(new Date())
    } catch (error) {
      console.error('津波情報の取得に失敗:', error)
      setError('津波情報の取得に失敗しました')
      // エラー時はサンプルデータを表示
      setTsunamiInfo(sampleTsunamiData)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTsunamiInfo()
    
    // 5分ごとに更新
    const interval = setInterval(fetchTsunamiInfo, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  // 次回更新時刻を計算
  const nextUpdate = new Date(lastUpdated.getTime() + 5 * 60 * 1000)

  return {
    tsunamiInfo,
    isLoading,
    error,
    lastUpdated,
    nextUpdate,
    refetch: fetchTsunamiInfo
  }
} 