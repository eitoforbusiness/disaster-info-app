import { useQuery } from '@tanstack/react-query'
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
  const {
    data: earthquakeInfo = sampleEarthquakeData,
    isLoading,
    error,
    refetch,
    dataUpdatedAt
  } = useQuery({
    queryKey: ['earthquakeInfo'],
    queryFn: async (): Promise<DisasterInfo[]> => {
      try {
        return await earthquakeApi.getEarthquakeInfo()
      } catch (error) {
        console.error('地震情報の取得に失敗:', error)
        // エラー時はサンプルデータを返す
        return sampleEarthquakeData
      }
    },
    refetchInterval: 5 * 60 * 1000, // 5分ごとに自動更新
    refetchIntervalInBackground: true,
    staleTime: 4 * 60 * 1000, // 4分間はデータを新鮮とみなす
    retry: 1,
    retryDelay: 1000,
  })

  const lastUpdated = new Date(dataUpdatedAt)
  const nextUpdate = new Date(lastUpdated.getTime() + 5 * 60 * 1000)

  return {
    earthquakeInfo,
    isLoading,
    error: error ? '地震情報の取得に失敗しました' : null,
    lastUpdated,
    nextUpdate,
    refetch
  }
} 