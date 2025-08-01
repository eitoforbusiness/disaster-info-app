# 防災・減災Webアプリケーション

地震・豪雨などの災害速報を表示し、住民が「通行止め」「陥没」「避難所混雑状況」を投稿して地図で共有できるWebアプリケーションです。

## プロジェクト構成

```
Practice TS/
├── disaster-frontend/     # フロントエンド（Next.js）
├── disaster-backend/      # バックエンド（Express.js）
└── README.md             # このファイル
```

## 機能

### ✅ 実装済み機能
- **災害速報表示**: 気象庁API連携による災害情報の一覧表示
  - 地震情報（震度・発生場所・時刻・深さ・マグニチュード）
  - 気象警報・注意報（大雨・強風など）
  - 津波警報・注意報
  - 火山情報
  - 台風情報
- **地図表示**: Leaflet + OpenStreetMapを使用した地図表示
- **投稿機能**: 位置情報付きの災害情報投稿
- **投稿一覧**: 最新の投稿をリスト表示
- **位置情報取得**: 現在地の自動取得と地図クリックでの位置選択
- **PWA対応**: オフライン対応とアプリ化
- **投稿編集・削除**: 投稿の編集・削除機能
- **信頼度システム**: いいね数による投稿の信頼度評価
- **多言語対応**: 日本語・英語の切り替え
- **レスポンシブデザイン**: スマートフォン対応

### 🔄 今後の拡張予定
- リアルタイム通知機能
- 画像投稿機能
- ユーザー認証システム
- より詳細な災害情報API連携

## 技術スタック

### フロントエンド
- **Framework**: Next.js 14 (TypeScript)
- **Styling**: Tailwind CSS
- **Map**: Leaflet + OpenStreetMap
- **PWA**: next-pwa

### バックエンド
- **Runtime**: Node.js + TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Container**: Docker Compose

## セットアップ手順

### 1. リポジトリのクローン
```bash
git clone <repository-url>
cd "Practice TS"
```

### 2. バックエンドのセットアップ
```bash
cd disaster-backend
npm install
docker-compose up -d
npx prisma migrate dev
npm run dev
```

### 3. フロントエンドのセットアップ
```bash
cd ../disaster-frontend
npm install
npm run dev
```

### 4. アクセス
- フロントエンド: http://localhost:3000
- バックエンド: http://localhost:3001
- pgAdmin: http://localhost:8080

## 使用方法

### ホームページ (`/`)
- 災害速報の表示
- 防災情報の確認
- 緊急時連絡先の表示

### マップページ (`/map`)
- 地図上での災害情報確認
- 新しい投稿の作成
- 投稿一覧の表示

### 投稿の作成
1. マップページに移動
2. 「現在地を取得」ボタンをクリック、または地図をクリックして位置を選択
3. タイトル、カテゴリ、詳細を入力
4. 「投稿する」ボタンをクリック

## アーキテクチャ

### フロントエンド（Next.js）
- **ページ**: ホームページ、マップページ
- **コンポーネント**: 地図表示、投稿フォーム、投稿編集モーダル
- **API通信**: バックエンドAPIとのREST通信
- **状態管理**: React Hooks
- **スタイリング**: Tailwind CSS

### バックエンド（Express.js）
- **API**: RESTful API
- **データベース**: PostgreSQL + Prisma
- **災害情報**: 気象庁API連携
- **CORS**: フロントエンドとの通信対応

## API エンドポイント

### バックエンドAPI（Express.js）
- `GET /health` - ヘルスチェック
- `GET /api/disaster-info` - 災害情報取得
- `GET /api/posts` - 投稿一覧取得
- `POST /api/posts` - 投稿作成
- `PUT /api/posts` - 投稿更新
- `DELETE /api/posts/:id` - 投稿削除
- `POST /api/posts/:id/like` - いいね機能

## 開発

### バックエンド開発
```bash
cd disaster-backend
npm run dev
```

### フロントエンド開発
```bash
cd disaster-frontend
npm run dev
```

### データベース管理
```bash
cd disaster-backend
docker-compose up -d
npx prisma studio
```

## デプロイ

### フロントエンド（Vercel）
1. Vercelにプロジェクトを作成
2. GitHubリポジトリを連携
3. 環境変数を設定
4. 自動デプロイ

### バックエンド（Railway/Render）
1. Railway/Renderにサービスを作成
2. GitHubリポジトリを連携
3. 環境変数を設定
4. ビルド・デプロイ

## 開発スケジュール

- **1日目**: プロジェクトセットアップ ✅
- **2日目**: DBスキーマ作成 ✅
- **3日目**: 投稿API実装 ✅
- **4日目**: 地図表示・投稿機能 ✅
- **5日目**: 災害速報API連携 ✅
- **6日目**: PWA対応・多言語対応 ✅
- **7日目**: 投稿編集・信頼度システム ✅

## ライセンス

MIT License

## 貢献

プルリクエストやイシューの報告を歓迎します。
