# 防災・減災アプリ バックエンド

Express.js + TypeScript + Prisma + PostgreSQL で構築されたバックエンドAPI

## 機能

- **災害情報API**: 気象庁APIから地震情報を取得
- **投稿管理**: 災害情報の投稿・編集・削除
- **いいね機能**: 投稿の信頼度評価
- **データベース**: PostgreSQL + Prisma ORM

## 技術スタック

- **Runtime**: Node.js + TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **CORS**: フロントエンドとの通信対応

## セットアップ

### 1. 依存関係のインストール
```bash
npm install
```

### 2. 環境変数の設定
`.env`ファイルを作成：
```env
PORT=3001
DATABASE_URL="postgresql://postgres:password@localhost:5432/disaster_info"
NODE_ENV=development
```

### 3. データベースの起動
```bash
docker-compose up -d
```

### 4. データベースのマイグレーション
```bash
npx prisma migrate dev
npx prisma generate
```

### 5. 開発サーバーの起動
```bash
npm run dev
```

## API エンドポイント

### ヘルスチェック
- `GET /health` - サーバーの状態確認

### 災害情報
- `GET /api/earthquake-info` - 気象庁APIから地震情報を取得
- `GET /api/tsunami-info` - 気象庁APIから津波情報を取得

### 投稿管理
- `GET /api/posts` - 投稿一覧を取得
- `POST /api/posts` - 新しい投稿を作成
- `PUT /api/posts` - 投稿を更新
- `DELETE /api/posts/:id` - 投稿を削除
- `POST /api/posts/:id/like` - 投稿にいいね

## 開発

### 開発サーバー
```bash
npm run dev
```

### ビルド
```bash
npm run build
```

### 本番起動
```bash
npm start
```

## データベース

### PostgreSQL
- ホスト: `localhost:5432`
- データベース: `disaster_info`
- ユーザー: `postgres`
- パスワード: `password`

### pgAdmin
- URL: `http://localhost:8080`
- メール: `admin@example.com`
- パスワード: `admin`

## 環境変数

| 変数名 | 説明 | デフォルト |
|--------|------|------------|
| `PORT` | サーバーのポート番号 | `3001` |
| `DATABASE_URL` | PostgreSQL接続URL | - |
| `NODE_ENV` | 実行環境 | `development` |

## デプロイ

### Railway
1. Railwayにプロジェクトを作成
2. GitHubリポジトリを連携
3. 環境変数を設定
4. 自動デプロイ

### Render
1. Renderにサービスを作成
2. GitHubリポジトリを連携
3. 環境変数を設定
4. ビルドコマンド: `npm run build`
5. 起動コマンド: `npm start` 