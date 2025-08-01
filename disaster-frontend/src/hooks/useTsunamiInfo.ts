import { useQuery } from '@tanstack/react-query'
import { tsunamiApi } from '@/lib/apis/tsunamiApi'
import { DisasterInfo } from '@/types'


export function useTsunamiInfo() {
  const {
    data: tsunamiInfo,
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
        throw new Error('津波情報の取得に失敗しました')
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