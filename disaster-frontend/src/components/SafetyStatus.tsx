export default function SafetyStatus() {
  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200 mb-8">
      <div className="text-center">
        <div className="text-green-600 text-5xl mb-4">🛡️</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">現在の安全状況</h2>
        <p className="text-gray-700 mb-4">
          気象庁から発表されている地震・津波の注意報・警報はありません。
        </p>
        <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
          <div className="bg-white p-3 rounded-lg border border-green-200">
            <div className="text-green-600 text-xl mb-1">✓</div>
            <p className="font-medium">地震情報</p>
            <p>震度3以上の地震は発生していません</p>
          </div>
          <div className="bg-white p-3 rounded-lg border border-green-200">
            <div className="text-green-600 text-xl mb-1">✓</div>
            <p className="font-medium">津波情報</p>
            <p>津波注意報・警報は発表されていません</p>
          </div>
          <div className="bg-white p-3 rounded-lg border border-green-200">
            <div className="text-blue-600 text-xl mb-1">🔄</div>
            <p className="font-medium">情報更新</p>
            <p>5分ごとに自動更新中</p>
          </div>
        </div>
      </div>
    </div>
  )
} 