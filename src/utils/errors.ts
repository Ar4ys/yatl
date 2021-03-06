import type { Request } from 'express'

export class BaseError extends Error {
  constructor(message?: string) {
    super(message)
    this.name = this.constructor.name
  }
}

export class ErrorWraper extends BaseError {
  public cause: Error

  constructor(message: string, cause: Error) {
    super(message)
    this.cause = cause
    // TODO: Find a better way to generate stack trace
    this.stack = `${this.name}: ${this.message}\n  Cause: ${cause.stack}`
  }

  toString() {
    return `${this.name}: ${this.message}\n  Cause: ${this.cause}`
  }
}

// export interface HTTPErrorOptions {
//   status?: number
//   shouldRender?: boolean
//   method?: string
//   path?: string
// }

// export class HTTPError extends BaseError {
//   public status: number
//   public shouldRender: boolean
//   public method?: string
//   public path?: string

//   constructor(message?: string, options: HTTPErrorOptions = {}) {
//     super(message)

//     const { status, shouldRender, method, path } = options
//     this.status = status ?? 500
//     this.shouldRender = shouldRender ?? false
//     this.method = method
//     this.path = path
//   }
// }

export class RouteError extends ErrorWraper {
  constructor(request: Request, cause: Error) {
    super(`[${request.method}] ${request.path}`, cause)
  }
}
