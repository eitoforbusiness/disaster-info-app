// 気象庁APIから災害情報を取得
export async function fetchJMAWeatherInfo() {
  try {
    const disasterInfo: any[] = []

    // 地震情報を取得（気象庁APIから実際のデータを取得）
    try {
      const earthquakeResponse = await fetch('https://www.jma.go.jp/bosai/quake/data/list.json', {
        headers: {
          'User-Agent': 'DisasterInfoApp/1.0'
        }
      })
      
      if (earthquakeResponse.ok) {
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
        
        disasterInfo.push(...recentEarthquakes)
        console.log(`地震情報を${recentEarthquakes.length}件取得しました`)
      } else {
        console.error('地震情報APIエラー:', earthquakeResponse.status)
      }
    } catch (error) {
      console.error('地震情報取得エラー:', error)
    }

    // 津波情報を取得
    try {
      const tsunamiResponse = await fetch('https://www.jma.go.jp/bosai/tsunami/data/list.json', {
        headers: { 'User-Agent': 'DisasterInfoApp/1.0' }
      })
      if (tsunamiResponse.ok) {
        const tsunamiData = await tsunamiResponse.json() as any[]
        const recentTsunami = tsunamiData.slice(0, 5).map((tsunami: any, index: number) => ({
          id: `tsunami_${tsunami.eid || 'unknown'}_${index}_${Date.now()}`,
          title: tsunami.ttl || '津波情報',
          description: tsunami.anm ? `${tsunami.anm}付近で津波情報が発表されました。` : '津波情報が発表されました。',
          severity: 'high',
          timestamp: tsunami.at || new Date().toISOString(),
          location: tsunami.anm || '不明',
          type: 'tsunami'
        }))
        disasterInfo.push(...recentTsunami)
        console.log(`津波情報を${recentTsunami.length}件取得しました`)
      } else {
        console.error('津波情報APIエラー:', tsunamiResponse.status)
      }
    } catch (error) {
      console.error('津波情報取得エラー:', error)
    }

    // 火山情報を取得
    try {
      const volcanoResponse = await fetch('https://www.jma.go.jp/bosai/volcano/data/list.json', {
        headers: { 'User-Agent': 'DisasterInfoApp/1.0' }
      })
      if (volcanoResponse.ok) {
        const volcanoData = await volcanoResponse.json() as any[]
        const recentVolcano = volcanoData.slice(0, 5).map((vol: any, index: number) => ({
          id: `volcano_${index}_${Date.now()}`,
          title: vol.ttl || '火山情報',
          description: vol.headline || '火山に関する情報が発表されました。',
          severity: 'medium',
          timestamp: vol.at || new Date().toISOString(),
          location: vol.anm || '不明',
          type: 'volcano'
        }))
        disasterInfo.push(...recentVolcano)
        console.log(`火山情報を${recentVolcano.length}件取得しました`)
      } else {
        console.error('火山情報APIエラー:', volcanoResponse.status)
      }
    } catch (error) {
      console.error('火山情報取得エラー:', error)
    }

    // 気象警報・注意報（大雨など）
    try {
      const warningResponse = await fetch('https://www.jma.go.jp/bosai/warning/data/warning/130000.json', {
        headers: { 'User-Agent': 'DisasterInfoApp/1.0' }
      })
      if (warningResponse.ok) {
        const warningData = await warningResponse.json() as any
        if (warningData.headlineText) {
          disasterInfo.push({
            id: `warning_${Date.now()}`,
            title: '気象警報・注意報',
            description: warningData.headlineText,
            severity: 'medium',
            timestamp: warningData.reportDatetime || new Date().toISOString(),
            location: '東京都',
            type: 'rain'
          })
          console.log('気象警報・注意報を取得しました')
        }
      } else {
        console.error('警報情報APIエラー:', warningResponse.status)
      }
    } catch (error) {
      console.error('警報情報取得エラー:', error)
    }

    // 台風情報を取得
    try {
      const typhoonResponse = await fetch('https://www.jma.go.jp/bosai/typhoon/data/typhoon.json', {
        headers: { 'User-Agent': 'DisasterInfoApp/1.0' }
      })
      if (typhoonResponse.ok) {
        const typhoonData = await typhoonResponse.json() as any[]
        const recentTyphoon = typhoonData.slice(0, 5).map((ty: any, index: number) => ({
          id: `typhoon_${index}_${Date.now()}`,
          title: ty.name ? `台風情報: ${ty.name}` : '台風情報',
          description: ty.detail || '台風に関する情報が発表されています。',
          severity: 'high',
          timestamp: ty.at || new Date().toISOString(),
          location: ty.position || '不明',
          type: 'typhoon'
        }))
        disasterInfo.push(...recentTyphoon)
        console.log(`台風情報を${recentTyphoon.length}件取得しました`)
      } else {
        console.error('台風情報APIエラー:', typhoonResponse.status)
      }
    } catch (error) {
      console.error('台風情報取得エラー:', error)
    }
    
    // データが取得できない場合は空の配列を返す
    if (disasterInfo.length === 0) {
      console.log('気象庁APIからデータを取得できませんでした。')
      return []
    }
    
    // タイムスタンプでソート（新しい順）
    disasterInfo.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    
    console.log(`合計${disasterInfo.length}件の災害情報を取得しました`)
    return disasterInfo.slice(0, 15) // 最新15件を返す
    
  } catch (error) {
    console.error('気象庁API取得エラー:', error)
    return []
  }
} 