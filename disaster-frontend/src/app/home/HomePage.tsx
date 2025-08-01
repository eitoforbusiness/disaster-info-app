'use client'

import { useEarthquakeInfo } from '@/hooks/useEarthquakeInfo'
import { useTsunamiInfo } from '@/hooks/useTsunamiInfo'
import Header from '@/components/Header'
import EarthquakeInfoList from '@/components/EarthquakeInfoList'
import TsunamiInfoList from '@/components/TsunamiInfoList'
import LastUpdatedInfo from '@/components/LastUpdatedInfo'
import QuickActions from '@/components/QuickActions'
import DisasterPreventionInfo from '@/components/DisasterPreventionInfo'

export default function HomePage() {
  const { 
    earthquakeInfo, 
    isLoading: earthquakeLoading, 
    error: earthquakeError, 
    lastUpdated: earthquakeLastUpdated,
    nextUpdate: earthquakeNextUpdate,
    refetch: refetchEarthquake 
  } = useEarthquakeInfo()
  
  const { 
    tsunamiInfo, 
    isLoading: tsunamiLoading, 
    error: tsunamiError, 
    lastUpdated: tsunamiLastUpdated,
    nextUpdate: tsunamiNextUpdate,
    refetch: refetchTsunami 
  } = useTsunamiInfo()

  // 最新の更新時刻を取得
  const latestUpdate = earthquakeLastUpdated > tsunamiLastUpdated ? earthquakeLastUpdated : tsunamiLastUpdated
  const nextUpdate = earthquakeNextUpdate < tsunamiNextUpdate ? earthquakeNextUpdate : tsunamiNextUpdate

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <EarthquakeInfoList 
          earthquakeInfo={earthquakeInfo || []}
          isLoading={earthquakeLoading}
          onRefresh={refetchEarthquake}
        />

        <TsunamiInfoList 
          tsunamiInfo={tsunamiInfo || []}
          isLoading={tsunamiLoading}
          onRefresh={refetchTsunami}
        />

        <LastUpdatedInfo 
          lastUpdated={latestUpdate}
          nextUpdate={nextUpdate}
        />

        <QuickActions />

        <DisasterPreventionInfo />
      </main>
    </div>
  )
}
