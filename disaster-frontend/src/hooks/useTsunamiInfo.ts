import { useQuery } from '@tanstack/react-query'
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
  const {
    data: tsunamiInfo = sampleTsunamiData,
    isLoading,
    error,
    refetch,
    dataUpdatedAt
  } = useQuery({
    queryKey: ['tsunamiInfo'],
    queryFn: async (): Promise<DisasterInfo[]> => {
      try {
        return await tsunamiApi.getTsunamiInfo()
      } catch (error) {
        console.error('津波情報の取得に失敗:', error)
        // エラー時はサンプルデータを返す
        return sampleTsunamiData
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
    tsunamiInfo,
    isLoading,
    error: error ? '津波情報の取得に失敗しました' : null,
    lastUpdated,
    nextUpdate,
    refetch
  }
} 