import { useQuery } from '@tanstack/react-query'
import { earthquakeApi } from '@/lib/apis/earthquakeApi'
import { DisasterInfo } from '@/types'


export function useEarthquakeInfo() {
  const {
    data: earthquakeInfo,
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
        throw new Error('地震情報の取得に失敗しました')
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