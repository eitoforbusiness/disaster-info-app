import L from 'leaflet'

// カテゴリに応じたアイコン色を取得
export function getCategoryColor(category: string): string {
  switch (category) {
    case '通行止め':
      return '#ff4444'
    case '陥没':
      return '#ff8800'
    case '避難所混雑':
      return '#ffaa00'
    default:
      return '#3388ff'
  }
}

// 投稿マーカーのアイコンを作成
export function createPostMarkerIcon(category: string): L.DivIcon {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="background-color: ${getCategoryColor(category)}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white;"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  })
}

// 選択位置マーカーのアイコンを作成
export function createSelectedLocationMarkerIcon(): L.DivIcon {
  return L.divIcon({
    className: 'selected-marker',
    html: '<div style="background-color: #00ff00; width: 25px; height: 25px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.3);"></div>',
    iconSize: [25, 25],
    iconAnchor: [12.5, 12.5],
  })
} 