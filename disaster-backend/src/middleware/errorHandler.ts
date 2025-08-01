import { Request, Response, NextFunction } from 'express'

export interface AppError extends Error {
  statusCode?: number
  isOperational?: boolean
}

export function errorHandler(
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode = err.statusCode || 500
  const message = err.message || 'サーバー内部エラーが発生しました'

  console.error('エラー詳細:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString()
  })

  res.status(statusCode).json({
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  })
}

export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json({
    error: '指定されたリソースが見つかりません'
  })
} 