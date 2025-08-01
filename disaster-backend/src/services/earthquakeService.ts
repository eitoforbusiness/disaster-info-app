// 気象庁APIから地震情報を取得
export async function fetchEarthquakeInfo() {
  try {
    const earthquakeResponse = await fetch('https://www.jma.go.jp/bosai/quake/data/list.json', {
      headers: {
        'User-Agent': 'DisasterInfoApp/1.0'
      }
    })
    
    if (!earthquakeResponse.ok) {
      console.error('地震情報APIエラー:', earthquakeResponse.status)
      return []
    }

    const earthquakeData = await earthquakeResponse.json() as any[]
    
    // 最新の地震情報を処理（震度3以上のみ表示、重複除去、場所・深さ不明を除外）
    const recentEarthquakes = earthquakeData
      .filter((quake: any) => {
        const maxIntensity = parseInt(quake.maxi || '0')
        const place = quake.anm || ''
        const cod = quake.cod || ''
        
        // 震度3以上、かつ場所が不明でない、かつ深さ情報がある場合のみ
        return maxIntensity >= 3 && 
               place !== '不明の場所' && 
               place !== '' && 
               cod !== '' && 
               cod.includes('-') // 深さ情報が含まれているかチェック
      })
      // 重複除去：発生時刻と場所でユニークにする
      .filter((quake: any, index: number, array: any[]) => {
        const currentTime = quake.at || ''
        const currentPlace = quake.anm || ''
        // 同じ時刻と場所の組み合わせで最初に出現したもののみを残す
        return array.findIndex((q: any) => 
          (q.at || '') === currentTime && (q.anm || '') === currentPlace
        ) === index
      })
      .slice(0, 5) // 最新5件に制限
      .map((quake: any, index: number) => {
        const magnitude = quake.mag || '不明'
        const place = quake.anm || '不明の場所' // anm: 震央地名
        const time = quake.at || new Date().toISOString() // at: 発生日時
        const maxIntensity = quake.maxi || '0' // maxi: 最大震度
        const title = quake.ttl || '震源・震度情報' // ttl: タイトル
        
        // 深さの計算（cod: "+37.3+136.8-10000/" の形式から深さを抽出）
        let depth = '不明'
        if (quake.cod) {
          const parts = quake.cod.split('/')[0].split('-')
          if (parts.length > 1) {
            const depthValue = parts[1]
            if (depthValue && depthValue !== 'undefined') {
              depth = `${parseInt(depthValue) / 1000}km` // メートルをキロメートルに変換
            }
          }
        }
        
        // 震度の日本語表記
        const intensityText = maxIntensity === '0' ? '震度0' :
                             maxIntensity === '1' ? '震度1' :
                             maxIntensity === '2' ? '震度2' :
                             maxIntensity === '3' ? '震度3' :
                             maxIntensity === '4' ? '震度4' :
                             maxIntensity === '5' ? '震度5' :
                             maxIntensity === '6' ? '震度6' :
                             maxIntensity === '7' ? '震度7' : `震度${maxIntensity}`
        
        return {
          id: `earthquake_${quake.eid || 'unknown'}_${index}_${Date.now()}`,
          title: `${title} - ${intensityText}`,
          description: `${place}でマグニチュード${magnitude}、${intensityText}の地震が発生しました。深さ: ${depth}`,
          severity: (maxIntensity !== '0' && parseInt(maxIntensity) >= 5) ? 'high' : 
                   (maxIntensity !== '0' && parseInt(maxIntensity) >= 3) ? 'medium' : 'low',
          timestamp: time,
          location: place,
          type: 'earthquake'
        }
      })
    
    console.log(`地震情報を${recentEarthquakes.length}件取得しました`)
    return recentEarthquakes
    
  } catch (error) {
    console.error('地震情報取得エラー:', error)
    return []
  }
} 