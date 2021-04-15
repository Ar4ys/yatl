import type { RequestHandler, NextFunction } from 'express'
import { RouteError } from './errors.js'

type asyncRequestHandler = 
  (...args: Parameters<RequestHandler>) => Promise<void> | void
type errorHandlerFabric = (fn: asyncRequestHandler) => RequestHandler

const asyncErrorHandler: errorHandlerFabric =
  fn => async (...args) => {
    const next = args[args.length-1] as NextFunction
    try {
      return await fn(...args)
    } catch (err) {
      next(new RouteError(args[0], err))
    }
  }

export default asyncErrorHandler
