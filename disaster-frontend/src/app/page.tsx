'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { disasterAPI, DisasterInfo } from '@/lib/api'

function getSeverityColor(severity: string) {
  switch (severity) {
    case 'high':
      return 'bg-red-500'
    case 'medium':
      return 'bg-yellow-500'
    case 'low':
      return 'bg-blue-500'
    default:
      return 'bg-gray-500'
  }
}

function getSeverityText(severity: string) {
  switch (severity) {
    case 'high':
      return '高'
    case 'medium':
      return '中'
    case 'low':
      return '低'
    default:
      return '不明'
  }
}

// 災害タイプに応じたアイコンと色を取得
function getDisasterTypeInfo(type: string) {
  switch (type) {
    case 'earthquake':
      return { icon: '🌋', color: 'border-red-500', bgColor: 'bg-red-50' }
    case 'tsunami':
      return { icon: '🌊', color: 'border-blue-500', bgColor: 'bg-blue-50' }
    case 'heavy_rain':
      return { icon: '🌧️', color: 'border-gray-500', bgColor: 'bg-gray-50' }
    case 'typhoon':
      return { icon: '🌀', color: 'border-purple-500', bgColor: 'bg-purple-50' }
    case 'volcano':
      return { icon: '🌋', color: 'border-orange-500', bgColor: 'bg-orange-50' }
    default:
      return { icon: '⚠️', color: 'border-yellow-500', bgColor: 'bg-yellow-50' }
  }
}

export default function HomePage() {
  const [disasterInfo, setDisasterInfo] = useState<DisasterInfo[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // 実際のAPIから災害情報を取得する関数
  const fetchDisasterInfo = async () => {
    setIsLoading(true)
    try {
      const data = await disasterAPI.getDisasterInfo()
      setDisasterInfo(data)
    } catch (error) {
      console.error('災害情報の取得に失敗:', error)
      // エラー時は空の配列を設定
      setDisasterInfo([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchDisasterInfo()
    
    // 5分ごとに更新
    const interval = setInterval(fetchDisasterInfo, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 災害速報セクション */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">災害速報</h2>
            <button
              onClick={fetchDisasterInfo}
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
          ) : disasterInfo.length > 0 ? (
            <div className="grid gap-4">
              {disasterInfo.map((info) => {
                const typeInfo = getDisasterTypeInfo(info.type)
                return (
                  <div key={info.id} className={`bg-white p-6 rounded-lg shadow-md border-l-4 ${typeInfo.color} ${typeInfo.bgColor}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">{typeInfo.icon}</span>
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
                )
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">現在、気象庁から災害情報は発表されていません。</p>
              <p className="text-sm text-gray-500 mt-2">定期的に更新されます。</p>
            </div>
          )}
        </div>

        {/* クイックアクション */}
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

        {/* 防災情報 */}
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
      </main>
    </div>
  )
}
