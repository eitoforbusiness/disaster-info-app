# 防災・減災アプリ - フロントエンド

Next.js 15.4.5を使用した防災・減災情報共有アプリのフロントエンドです。

## 機能

- **地震速報**: 気象庁APIから地震情報を取得・表示
- **津波速報**: 気象庁APIから津波情報を取得・表示
- **地図表示**: Leafletを使用したインタラクティブマップ
- **投稿機能**: 災害情報の投稿・編集・削除
- **リアルタイム更新**: 5分ごとの自動更新

## 技術スタック

- **フレームワーク**: Next.js 15.4.5
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **地図**: Leaflet + React Leaflet
- **状態管理**: React Hooks

## 開発環境のセットアップ

### 前提条件

- Node.js 18.0.0以上
- npm または yarn

### インストール

```bash
cd disaster-frontend
npm install
```

### 開発サーバーの起動

```bash
npm run dev
```

フロントエンドは http://localhost:3000 で起動します。

### バックエンドとの連携

フロントエンドは http://localhost:3001 で動作するバックエンドAPIと連携します。

## プロジェクト構造

```
disaster-frontend/
├── src/
│   ├── app/                 # Next.js App Router
│   ├── components/          # Reactコンポーネント
│   ├── hooks/              # カスタムフック
│   ├── lib/                # ユーティリティ・API
│   ├── types/              # TypeScript型定義
│   ├── utils/              # ヘルパー関数
│   └── constants/          # 定数
├── public/                 # 静的ファイル
└── package.json
```

## 利用可能なスクリプト

- `npm run dev` - 開発サーバー起動
- `npm run build` - プロダクションビルド
- `npm run start` - プロダクションサーバー起動
- `npm run lint` - ESLint実行

## APIエンドポイント

フロントエンドは以下のバックエンドAPIエンドポイントを使用します：

- `GET /api/earthquake-info` - 地震情報取得
- `GET /api/tsunami-info` - 津波情報取得
- `GET /api/posts` - 投稿一覧取得
- `POST /api/posts` - 投稿作成
- `PUT /api/posts` - 投稿更新
- `DELETE /api/posts/:id` - 投稿削除
- `POST /api/posts/:id/like` - いいね機能
- `GET /health` - ヘルスチェック

## 環境変数

`.env.local`ファイルを作成して以下の環境変数を設定してください：

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## ライセンス

MIT License 