# 防災・減災Webアプリ

地震・豪雨などの災害速報を表示し、住民が「通行止め」「陥没」「避難所混雑状況」を投稿して地図で共有できるWebアプリケーションです。

## 機能

### ✅ 実装済み機能
- **災害速報表示**: 災害情報の一覧表示（現在はサンプルデータ）
- **地図表示**: Leaflet + OpenStreetMapを使用した地図表示
- **投稿機能**: 位置情報付きの災害情報投稿
- **投稿一覧**: 最新の投稿をリスト表示
- **位置情報取得**: 現在地の自動取得と地図クリックでの位置選択

### 🔄 今後の実装予定
- 気象庁APIとの連携
- PWA対応
- 投稿の編集・削除機能
- 投稿の信頼度システム
- 多言語対応

## 技術スタック

- **フロントエンド**: Next.js 14 (TypeScript)
- **バックエンド**: Next.js API Routes
- **データベース**: PostgreSQL (Docker)
- **ORM**: Prisma
- **地図**: Leaflet + OpenStreetMap
- **スタイリング**: Tailwind CSS
- **コンテナ**: Docker Compose

## セットアップ手順

### 1. リポジトリのクローン
```bash
git clone <repository-url>
cd disaster-info-app
```

### 2. 依存関係のインストール
```bash
npm install
```

### 3. 環境変数の設定
`.env`ファイルが既に作成されていますが、必要に応じて編集してください：
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/disaster_info"
```

### 4. データベースの起動
```bash
docker-compose up -d
```

### 5. データベースのマイグレーション
```bash
npx prisma migrate dev
npx prisma generate
```

### 6. 開発サーバーの起動
```bash
npm run dev
```

アプリケーションは `http://localhost:3000` でアクセスできます。

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

## データベース構造

### Post テーブル
```sql
- id: 主キー
- title: 投稿タイトル
- category: カテゴリ（通行止め、陥没、避難所混雑など）
- comment: 詳細コメント
- latitude: 緯度
- longitude: 経度
- createdAt: 作成日時
- updatedAt: 更新日時
```

## API エンドポイント

### GET /api/posts
投稿一覧を取得

### POST /api/posts
新しい投稿を作成

## 開発スケジュール

- **1日目**: プロジェクトセットアップ ✅
- **2日目**: DBスキーマ作成 ✅
- **3日目**: 投稿API実装 ✅
- **4日目**: 地図表示・投稿機能 ✅
- **5日目**: 災害速報API連携 🔄
- **6日目**: UI調整・テスト 🔄
- **7日目**: デプロイ・バグ修正 🔄

## ライセンス

MIT License

## 貢献

プルリクエストやイシューの報告を歓迎します。
