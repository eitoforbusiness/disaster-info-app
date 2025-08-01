interface LastUpdatedInfoProps {
  lastUpdated: Date
  nextUpdate: Date
}

export default function LastUpdatedInfo({ lastUpdated, nextUpdate }: LastUpdatedInfoProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleString('ja-JP', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getTimeUntilNextUpdate = () => {
    const now = new Date()
    const diff = nextUpdate.getTime() - now.getTime()
    const minutes = Math.ceil(diff / (1000 * 60))
    return minutes > 0 ? `${minutes}分後` : 'まもなく'
  }

  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between text-sm text-gray-600">
        <div>
          <span className="font-medium">最終更新:</span> {formatTime(lastUpdated)}
        </div>
        <div>
          <span className="font-medium">次回更新:</span> {getTimeUntilNextUpdate()}
        </div>
      </div>
      <div className="mt-2 text-xs text-gray-500">
        <p>• 情報は気象庁の公式データに基づいています</p>
        <p>• 5分ごとに自動更新されます</p>
      </div>
    </div>
  )
} 