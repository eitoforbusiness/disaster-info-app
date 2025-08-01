'use client'

import { useDisasterInfo } from '@/hooks/useDisasterInfo'
import Header from '@/components/Header'
import DisasterInfoList from '@/components/DisasterInfoList'
import QuickActions from '@/components/QuickActions'
import DisasterPreventionInfo from '@/components/DisasterPreventionInfo'

export default function HomePage() {
  const { disasterInfo, isLoading, error, refetch } = useDisasterInfo()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DisasterInfoList 
          disasterInfo={disasterInfo}
          isLoading={isLoading}
          onRefresh={refetch}
        />

        <QuickActions />

        <DisasterPreventionInfo />
      </main>
    </div>
  )
}
