import { Response } from 'express'

export interface ApiError extends Error {
  statusCode?: number
  isOperational?: boolean
}

export class AppError extends Error implements ApiError {
  public statusCode: number
  public isOperational: boolean

  constructor(message: string, statusCode: number = 500) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = true

    Error.captureStackTrace(this, this.constructor)
  }
}

export function handleControllerError(error: unknown, res: Response, operation: string): void {
  console.error(`${operation}エラー:`, error)
  
  if (error instanceof AppError) {
    res.status(error.statusCode).json({ error: error.message })
  } else if (error instanceof Error) {
    res.status(500).json({ error: error.message })
  } else {
    res.status(500).json({ error: `${operation}に失敗しました` })
  }
}

export function createValidationError(message: string): AppError {
  return new AppError(message, 400)
}

export function createNotFoundError(message: string): AppError {
  return new AppError(message, 404)
}

export function createServerError(message: string): AppError {
  return new AppError(message, 500)
} 