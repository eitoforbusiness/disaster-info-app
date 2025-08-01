import Link from 'next/link'

export default function QuickActions() {
  return (
    <div className="grid md:grid-cols-2 gap-6 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">地図で情報確認</h3>
        <p className="text-gray-600 mb-4">
          地図上で災害情報を確認し、新しい情報を投稿できます。
        </p>
        <Link 
          href="/map"
          className="inline-block bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          マップを開く
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">緊急時の連絡先</h3>
        <div className="space-y-2 text-sm">
          <p><strong>消防・救急:</strong> 119</p>
          <p><strong>警察:</strong> 110</p>
          <p><strong>災害用伝言ダイヤル:</strong> 171</p>
          <p><strong>気象庁:</strong> 03-3212-8341</p>
        </div>
      </div>
    </div>
  )
} 