import express from 'express'
import dotenv from 'dotenv'

// ミドルウェアとルートのインポート
import { corsMiddleware } from './middleware/cors'
import { errorHandler, notFoundHandler } from './middleware/errorHandler'
import disasterRoutes from './routes/disaster'
import postRoutes from './routes/posts'
import healthRoutes from './routes/health'
import Database from './lib/database'

// 環境変数の読み込み
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// ミドルウェア
app.use(corsMiddleware)
app.use(express.json())

// ルートの設定
app.use('/health', healthRoutes)
app.use('/api', disasterRoutes)
app.use('/api/posts', postRoutes)

// 404ハンドラー
app.use(notFoundHandler)

// エラーハンドラー
app.use(errorHandler)

// サーバー起動
app.listen(PORT, async () => {
  try {
    await Database.connect()
    console.log(`🚀 バックエンドサーバーが起動しました: http://localhost:${PORT}`)
    console.log(`📊 ヘルスチェック: http://localhost:${PORT}/health`)
  } catch (error) {
    console.error('サーバー起動エラー:', error)
    process.exit(1)
  }
})

// グレースフルシャットダウン
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully')
  await Database.disconnect()
  process.exit(0)
})

process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down gracefully')
  await Database.disconnect()
  process.exit(0)
}) 