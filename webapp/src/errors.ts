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

export class NotLoginedError extends BaseError {}
