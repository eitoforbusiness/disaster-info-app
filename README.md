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
- **地図表示**: Leaflet + OpenStreetMapを使用した地図表示
- **投稿機能**: 位置情報付きの災害情報投稿
- **投稿一覧**: 最新の投稿をリスト表示
- **位置情報取得**: 現在地の自動取得と地図クリックでの位置選択
- **PWA対応**: オフライン対応とアプリ化
- **投稿編集・削除**: 投稿の編集・削除機能
- **信頼度システム**: いいね数による投稿の信頼度評価
- **多言語対応**: 日本語・英語の切り替え
- **レスポンシブデザイン**: スマートフォン対応

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

## ライセンス

MIT License

## 貢献

プルリクエストやイシューの報告を歓迎します。 