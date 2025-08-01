export default function DisasterPreventionInfo() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">防災のポイント</h3>
      <div className="grid md:grid-cols-3 gap-4 text-sm">
        <div>
          <h4 className="font-medium mb-2">地震の場合</h4>
          <ul className="space-y-1 text-gray-600">
            <li>• 机の下に隠れる</li>
            <li>• 火の元を確認</li>
            <li>• 避難経路を確保</li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium mb-2">豪雨の場合</h4>
          <ul className="space-y-1 text-gray-600">
            <li>• 高台に避難</li>
            <li>• 河川から離れる</li>
            <li>• 地下は避ける</li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium mb-2">避難時の準備</h4>
          <ul className="space-y-1 text-gray-600">
            <li>• 非常用持ち出し袋</li>
            <li>• 家族との連絡方法</li>
            <li>• 避難所の場所確認</li>
          </ul>
        </div>
      </div>
    </div>
  )
} 