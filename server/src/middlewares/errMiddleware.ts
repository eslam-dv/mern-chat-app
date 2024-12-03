import { ErrorRequestHandler, Request, Response, NextFunction } from 'express'

export class BaseError extends Error {
  statusCode: number
  constructor(statusCode: number, message: string) {
    super(message)
    this.statusCode = statusCode
    Object.setPrototypeOf(this, BaseError.prototype)
  }
}

export class NotFoundError extends BaseError {
  propertyName: string
  constructor(propertyName: string) {
    super(404, `${propertyName} not found`)
    this.propertyName = propertyName
    Object.setPrototypeOf(this, NotFoundError.prototype)
  }
}

export class AuthenticationError extends BaseError {
  constructor(message: string) {
    super(401, `Authentication Error: ${message}`)
    Object.setPrototypeOf(this, AuthenticationError.prototype)
  }
}

const errorHandler: ErrorRequestHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof BaseError) {
    res
      .status(err.statusCode)
      .json({
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : null,
        success: false,
      })
  } else {
    console.error(err)
    res.status(500).json({ message: 'Something went wrong', success: false })
  }
}

export default errorHandler
