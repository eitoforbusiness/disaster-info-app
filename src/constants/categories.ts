export const POST_CATEGORIES = [
  '通行止め',
  '陥没',
  '避難所混雑',
  '道路損壊',
  '建物損壊',
  'その他'
] as const

export type PostCategory = typeof POST_CATEGORIES[number] 