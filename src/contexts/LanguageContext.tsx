'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type Language = 'ja' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// 翻訳データ
const translations = {
  ja: {
    'app.title': '防災・減災アプリ',
    'app.description': '災害情報の共有と確認',
    'home.title': 'ホーム',
    'map.title': 'マップ',
    'disaster.alert': '災害速報',
    'disaster.refresh': '更新',
    'disaster.refreshing': '更新中...',
    'disaster.loading': '災害情報を取得中...',
    'disaster.severity.high': '高',
    'disaster.severity.medium': '中',
    'disaster.severity.low': '低',
    'disaster.severity.unknown': '不明',
    'map.page.title': '災害情報マップ',
    'map.page.description': '地図上で災害情報を確認・投稿できます',
    'map.loading': '地図を読み込み中...',
    'post.title': '災害情報を投稿',
    'post.form.title': 'タイトル *',
    'post.form.title.placeholder': '例: 〇〇通りが通行止め',
    'post.form.category': 'カテゴリ *',
    'post.form.category.select': 'カテゴリを選択',
    'post.form.comment': '詳細 *',
    'post.form.comment.placeholder': '詳細な状況を教えてください',
    'post.form.location': '位置情報 *',
    'post.form.location.get': '現在地を取得',
    'post.form.location.click': 'または地図をクリックして位置を選択',
    'post.form.submit': '投稿する',
    'post.form.submitting': '投稿中...',
    'post.edit.title': '投稿を編集',
    'post.edit.update': '更新',
    'post.edit.updating': '更新中...',
    'post.edit.delete': '削除',
    'post.edit.delete.confirm': 'この投稿を削除しますか？',
    'post.list.title': '最新の投稿',
    'post.list.empty': 'まだ投稿がありません',
    'post.list.edit': '編集',
    'categories.road_closed': '通行止め',
    'categories.sinkhole': '陥没',
    'categories.shelter_crowded': '避難所混雑',
    'categories.road_damage': '道路損壊',
    'categories.building_damage': '建物損壊',
    'categories.other': 'その他',
    'emergency.contacts': '緊急時の連絡先',
    'emergency.fire': '消防・救急: 119',
    'emergency.police': '警察: 110',
    'emergency.message': '災害用伝言ダイヤル: 171',
    'emergency.jma': '気象庁: 03-3212-8341',
    'disaster.points': '防災のポイント',
    'disaster.earthquake': '地震の場合',
    'disaster.earthquake.hide': '机の下に隠れる',
    'disaster.earthquake.fire': '火の元を確認',
    'disaster.earthquake.route': '避難経路を確保',
    'disaster.rain': '豪雨の場合',
    'disaster.rain.high': '高台に避難',
    'disaster.rain.river': '河川から離れる',
    'disaster.rain.underground': '地下は避ける',
    'disaster.evacuation': '避難時の準備',
    'disaster.evacuation.bag': '非常用持ち出し袋',
    'disaster.evacuation.contact': '家族との連絡方法',
    'disaster.evacuation.shelter': '避難所の場所確認',
    'error.required': 'すべての項目を入力してください',
    'error.location': '位置情報を設定してください',
    'error.location.unavailable': '位置情報が利用できません',
    'error.location.failed': '位置情報の取得に失敗しました',
    'error.post.failed': '投稿に失敗しました',
    'error.post.update.failed': '投稿の更新に失敗しました',
    'error.post.delete.failed': '投稿の削除に失敗しました',
    'error.disaster.failed': '災害情報の取得に失敗しました',
    'success.post': '投稿が完了しました！',
    'success.update': '投稿を更新しました！',
    'success.delete': '投稿を削除しました！',
  },
  en: {
    'app.title': 'Disaster Prevention App',
    'app.description': 'Share and check disaster information',
    'home.title': 'Home',
    'map.title': 'Map',
    'disaster.alert': 'Disaster Alerts',
    'disaster.refresh': 'Refresh',
    'disaster.refreshing': 'Refreshing...',
    'disaster.loading': 'Loading disaster information...',
    'disaster.severity.high': 'High',
    'disaster.severity.medium': 'Medium',
    'disaster.severity.low': 'Low',
    'disaster.severity.unknown': 'Unknown',
    'map.page.title': 'Disaster Information Map',
    'map.page.description': 'Check and post disaster information on the map',
    'map.loading': 'Loading map...',
    'post.title': 'Post Disaster Information',
    'post.form.title': 'Title *',
    'post.form.title.placeholder': 'e.g., Road closed on XX Street',
    'post.form.category': 'Category *',
    'post.form.category.select': 'Select category',
    'post.form.comment': 'Details *',
    'post.form.comment.placeholder': 'Please provide detailed information',
    'post.form.location': 'Location *',
    'post.form.location.get': 'Get current location',
    'post.form.location.click': 'Or click on the map to select location',
    'post.form.submit': 'Post',
    'post.form.submitting': 'Posting...',
    'post.edit.title': 'Edit Post',
    'post.edit.update': 'Update',
    'post.edit.updating': 'Updating...',
    'post.edit.delete': 'Delete',
    'post.edit.delete.confirm': 'Are you sure you want to delete this post?',
    'post.list.title': 'Latest Posts',
    'post.list.empty': 'No posts yet',
    'post.list.edit': 'Edit',
    'categories.road_closed': 'Road Closed',
    'categories.sinkhole': 'Sinkhole',
    'categories.shelter_crowded': 'Shelter Crowded',
    'categories.road_damage': 'Road Damage',
    'categories.building_damage': 'Building Damage',
    'categories.other': 'Other',
    'emergency.contacts': 'Emergency Contacts',
    'emergency.fire': 'Fire/Ambulance: 119',
    'emergency.police': 'Police: 110',
    'emergency.message': 'Disaster Message: 171',
    'emergency.jma': 'Japan Meteorological Agency: 03-3212-8341',
    'disaster.points': 'Disaster Prevention Points',
    'disaster.earthquake': 'In case of earthquake',
    'disaster.earthquake.hide': 'Hide under a desk',
    'disaster.earthquake.fire': 'Check fire sources',
    'disaster.earthquake.route': 'Secure evacuation route',
    'disaster.rain': 'In case of heavy rain',
    'disaster.rain.high': 'Evacuate to high ground',
    'disaster.rain.river': 'Stay away from rivers',
    'disaster.rain.underground': 'Avoid underground areas',
    'disaster.evacuation': 'Evacuation preparation',
    'disaster.evacuation.bag': 'Emergency bag',
    'disaster.evacuation.contact': 'Family contact method',
    'disaster.evacuation.shelter': 'Check shelter locations',
    'error.required': 'Please fill in all fields',
    'error.location': 'Please set location',
    'error.location.unavailable': 'Location is not available',
    'error.location.failed': 'Failed to get location',
    'error.post.failed': 'Failed to post',
    'error.post.update.failed': 'Failed to update post',
    'error.post.delete.failed': 'Failed to delete post',
    'error.disaster.failed': 'Failed to get disaster information',
    'success.post': 'Post completed!',
    'success.update': 'Post updated!',
    'success.delete': 'Post deleted!',
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('ja')

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
} 