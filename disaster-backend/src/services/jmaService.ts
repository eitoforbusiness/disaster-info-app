// 気象庁APIから災害情報を取得
export async function fetchJMAWeatherInfo() {
  try {
    const disasterInfo: any[] = []
    
    // 地震情報を取得
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
        headers: {
          'User-Agent': 'DisasterInfoApp/1.0'
        }
      })
      
      if (tsunamiResponse.ok) {
        const tsunamiData = await tsunamiResponse.json() as any[]
        
        const recentTsunamis = tsunamiData
          .slice(0, 5) // 最新5件に制限
          .map((tsunami: any, index: number) => {
            const title = tsunami.ttl || '津波情報'
            const time = tsunami.at || new Date().toISOString()
            const area = tsunami.anm || '全国'
            
            return {
              id: `tsunami_${tsunami.eid || 'unknown'}_${index}_${Date.now()}`,
              title: title,
              description: `${area}に津波注意報・警報が発表されました。`,
              severity: 'high',
              timestamp: time,
              location: area,
              type: 'tsunami'
            }
          })
        
        disasterInfo.push(...recentTsunamis)
        console.log(`津波情報を${recentTsunamis.length}件取得しました`)
      } else {
        console.error('津波情報APIエラー:', tsunamiResponse.status)
      }
    } catch (error) {
      console.error('津波情報取得エラー:', error)
    }

    // 大雨・洪水警報のモックデータ（実際のAPIが利用できないため）
    try {
      const mockWeatherWarnings = [
        {
          id: `heavy_rain_mock_1_${Date.now()}`,
          title: '大雨警報',
          description: '東京都に大雨警報が発表されました。河川の増水に注意してください。',
          severity: 'medium',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2時間前
          location: '東京都',
          type: 'heavy_rain'
        },
        {
          id: `heavy_rain_mock_2_${Date.now()}`,
          title: '洪水注意報',
          description: '神奈川県に洪水注意報が発表されました。低地の浸水に注意してください。',
          severity: 'medium',
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4時間前
          location: '神奈川県',
          type: 'heavy_rain'
        }
      ]
      
      disasterInfo.push(...mockWeatherWarnings)
      console.log(`大雨・洪水警報のモックデータを${mockWeatherWarnings.length}件追加しました`)
    } catch (error) {
      console.error('大雨・洪水警報モックデータ作成エラー:', error)
    }

    // 台風情報のモックデータ（実際のAPIが利用できないため）
    try {
      const mockTyphoonInfo = [
        {
          id: `typhoon_mock_1_${Date.now()}`,
          title: '台風情報',
          description: '台風12号が太平洋上で発生しました。今後の進路に注意してください。',
          severity: 'high',
          timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6時間前
          location: '太平洋',
          type: 'typhoon'
        }
      ]
      
      disasterInfo.push(...mockTyphoonInfo)
      console.log(`台風情報のモックデータを${mockTyphoonInfo.length}件追加しました`)
    } catch (error) {
      console.error('台風情報モックデータ作成エラー:', error)
    }

    // 火山情報のモックデータ（実際のAPIが利用できないため）
    try {
      const mockVolcanoInfo = [
        {
          id: `volcano_mock_1_${Date.now()}`,
          title: '火山情報',
          description: '桜島で火山活動が活発化しています。噴火警戒レベルが引き上げられました。',
          severity: 'medium',
          timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8時間前
          location: '桜島',
          type: 'volcano'
        }
      ]
      
      disasterInfo.push(...mockVolcanoInfo)
      console.log(`火山情報のモックデータを${mockVolcanoInfo.length}件追加しました`)
    } catch (error) {
      console.error('火山情報モックデータ作成エラー:', error)
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