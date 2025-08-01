import { PrismaClient } from '@prisma/client'

class Database {
  private static instance: PrismaClient

  static getInstance(): PrismaClient {
    if (!Database.instance) {
      Database.instance = new PrismaClient({
        log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
      })
    }
    return Database.instance
  }

  static async connect(): Promise<void> {
    const prisma = Database.getInstance()
    try {
      await prisma.$connect()
      console.log('✅ データベースに接続しました')
    } catch (error) {
      console.error('❌ データベース接続エラー:', error)
      throw error
    }
  }

  static async disconnect(): Promise<void> {
    const prisma = Database.getInstance()
    try {
      await prisma.$disconnect()
      console.log('✅ データベース接続を切断しました')
    } catch (error) {
      console.error('❌ データベース切断エラー:', error)
      throw error
    }
  }
}

export const prisma = Database.getInstance()
export default Database 