import { ValidationError } from './joi.error'
import { response } from './utils'
import { ErrorCode } from './errCode'

class AppError extends Error {
  public readonly code: number
  public readonly isOperational: boolean
  
  constructor(
    code: number,
    message: string,
    isOperational:boolean = true,
    stack: string = ''
  ) {
    super(message)
    this.code = code
    this.isOperational = isOperational
    if (stack) {
      this.stack = stack
    } else {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

const handleError = (err: Error & ValidationError) => {
  if (err instanceof AppError) {
    if (err.isOperational === false) {
      process.exit(1)
    }
    
    return response({
      details: err.message,
      code: err.code
    })
  }

  if (err?.isJoi === true) {
    return response({
      details: err.details,
      code: ErrorCode.BAD_REQUEST
    })
  }

  return response({
    details: err.stack,
    code: ErrorCode.INTERNAL_SERVER
  })
}

export {
  ErrorCode,
  AppError,
  handleError
}