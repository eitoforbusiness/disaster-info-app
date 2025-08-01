// 危険度に応じた色を取得
export function getSeverityColor(severity: string): string {
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

// 危険度に応じたテキストを取得
export function getSeverityText(severity: string): string {
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