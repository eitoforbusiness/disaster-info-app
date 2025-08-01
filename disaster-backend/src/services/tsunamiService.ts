// 気象庁APIから津波情報を取得
export async function fetchTsunamiInfo() {
  try {
    const tsunamiResponse = await fetch('https://www.jma.go.jp/bosai/tsunami/data/list.json', {
      headers: {
        'User-Agent': 'DisasterInfoApp/1.0'
      }
    })
    
    if (!tsunamiResponse.ok) {
      console.error('津波情報APIエラー:', tsunamiResponse.status)
      return []
    }

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
    
    console.log(`津波情報を${recentTsunamis.length}件取得しました`)
    return recentTsunamis
    
  } catch (error) {
    console.error('津波情報取得エラー:', error)
    return []
  }
} 