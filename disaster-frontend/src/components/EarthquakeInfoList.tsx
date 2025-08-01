import { DisasterInfo } from '@/types'
import { getSeverityColor, getSeverityText } from '@/utils/severityUtils'

interface EarthquakeInfoListProps {
  earthquakeInfo: DisasterInfo[]
  isLoading: boolean
  onRefresh: () => void
}

export default function EarthquakeInfoList({ earthquakeInfo, isLoading, onRefresh }: EarthquakeInfoListProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">地震速報</h2>
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50"
        >
          {isLoading ? '更新中...' : '更新'}
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">地震情報を取得中...</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {earthquakeInfo.length === 0 ? (
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
              <div className="text-center">
                <div className="text-green-500 text-4xl mb-2">✓</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">現在、地震情報はありません</h3>
                <p className="text-gray-600 mb-4">気象庁から発表されている地震情報はありません。</p>
                <div className="text-sm text-gray-500">
                  <p>• 最新の情報は5分ごとに自動更新されます</p>
                  <p>• 震度3以上の地震が発生した場合に表示されます</p>
                  <p>• 気象庁の公式データに基づいています</p>
                </div>
              </div>
            </div>
          ) : (
            earthquakeInfo.map((info) => (
              <div key={info.id} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{info.title}</h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${getSeverityColor(info.severity)}`}>
                        危険度: {getSeverityText(info.severity)}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-2">{info.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>場所: {info.location}</span>
                      <span>時刻: {new Date(info.timestamp).toLocaleString('ja-JP')}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
} 