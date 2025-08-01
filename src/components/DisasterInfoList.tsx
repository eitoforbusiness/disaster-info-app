import { DisasterInfo } from '@/types'
import { getSeverityColor, getSeverityText } from '@/utils/severityUtils'

interface DisasterInfoListProps {
  disasterInfo: DisasterInfo[]
  isLoading: boolean
  onRefresh: () => void
}

export default function DisasterInfoList({ disasterInfo, isLoading, onRefresh }: DisasterInfoListProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">災害速報</h2>
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
        >
          {isLoading ? '更新中...' : '更新'}
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">災害情報を取得中...</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {disasterInfo.map((info) => (
            <div key={info.id} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
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
          ))}
        </div>
      )}
    </div>
  )
} 