// このファイルは非推奨です。代わりに earthquakeService.ts と tsunamiService.ts を使用してください。
// 後方互換性のために残しています。

import { fetchEarthquakeInfo } from './earthquakeService'
import { fetchTsunamiInfo } from './tsunamiService'

// 気象庁APIから地震・津波情報を取得（非推奨）
export async function fetchJMAWeatherInfo() {
  try {
    const [earthquakeInfo, tsunamiInfo] = await Promise.all([
      fetchEarthquakeInfo(),
      fetchTsunamiInfo()
    ])
    
    const disasterInfo = [...earthquakeInfo, ...tsunamiInfo]
    
    // タイムスタンプでソート（新しい順）
    disasterInfo.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    
    console.log(`合計${disasterInfo.length}件の災害情報を取得しました`)
    return disasterInfo.slice(0, 10) // 最新10件を返す
    
  } catch (error) {
    console.error('気象庁API取得エラー:', error)
    return []
  }
} 