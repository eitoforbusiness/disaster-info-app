import express from 'express'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'

// ミドルウェアとルートのインポート
import { corsMiddleware } from './middleware/cors'
import disasterRoutes from './routes/disaster'
import postRoutes from './routes/posts'
import healthRoutes from './routes/health'

// 環境変数の読み込み
dotenv.config()

const app = express()
const prisma = new PrismaClient()
const PORT = process.env.PORT || 3001

// ミドルウェア
app.use(corsMiddleware)
app.use(express.json())

// ルートの設定
app.use('/health', healthRoutes)
app.use('/api', disasterRoutes)
app.use('/api/posts', postRoutes)

// サーバー起動
app.listen(PORT, () => {
  console.log(`🚀 バックエンドサーバーが起動しました: http://localhost:${PORT}`)
  console.log(`📊 ヘルスチェック: http://localhost:${PORT}/health`)
})

// グレースフルシャットダウン
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully')
  await prisma.$disconnect()
  process.exit(0)
})

process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down gracefully')
  await prisma.$disconnect()
  process.exit(0)
}) 