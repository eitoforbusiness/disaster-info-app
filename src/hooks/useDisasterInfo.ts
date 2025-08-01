import { useState, useEffect } from 'react'
import { disasterApi } from '@/lib/apis/disasterApi'
import { DisasterInfo } from '@/types'

// サンプルデータ（実際のAPIに置き換える予定）
const sampleDisasterData: DisasterInfo[] = [
  {
    id: '1',
    title: '地震速報',
    description: '震度4の地震が発生しました。',
    severity: 'high',
    timestamp: '2024-01-15T10:30:00Z',
    location: '東京都',
    type: 'earthquake'
  },
  {
    id: '2',
    title: '豪雨警報',
    description: '大雨による河川の氾濫に注意してください。',
    severity: 'medium',
    timestamp: '2024-01-15T09:15:00Z',
    location: '神奈川県',
    type: 'rain'
  },
  {
    id: '3',
    title: '強風注意報',
    description: '強風による被害にご注意ください。',
    severity: 'low',
    timestamp: '2024-01-15T08:45:00Z',
    location: '千葉県',
    type: 'wind'
  }
]

export function useDisasterInfo() {
  const [disasterInfo, setDisasterInfo] = useState<DisasterInfo[]>(sampleDisasterData)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchDisasterInfo = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await disasterApi.getDisasterInfo()
      setDisasterInfo(data)
    } catch (error) {
      console.error('災害情報の取得に失敗:', error)
      setError('災害情報の取得に失敗しました')
      // エラー時はサンプルデータを表示
      setDisasterInfo(sampleDisasterData)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchDisasterInfo()
    
    // 5分ごとに更新
    const interval = setInterval(fetchDisasterInfo, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  return {
    disasterInfo,
    isLoading,
    error,
    refetch: fetchDisasterInfo
  }
} 