import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">防災・減災アプリ</h1>
            <p className="text-gray-600">災害情報の共有と確認</p>
          </div>
          <nav className="flex space-x-4">
            <Link 
              href="/" 
              className="text-gray-900 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              ホーム
            </Link>
            <Link 
              href="/map" 
              className="text-gray-900 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              マップ
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
} 