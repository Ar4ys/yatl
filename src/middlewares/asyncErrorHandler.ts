import type { RequestHandler, NextFunction } from 'express'
import type { Query } from 'express-serve-static-core'
import { RouteError } from '../utils/errors.js'

type AsyncRequestHandler<P, B, Q> = 
  (...args: Parameters<RequestHandler<P, unknown, B, Q>>) => Promise<void> | void

function asyncErrorHandler<
  ReqBody = any,
  Params extends string = string,
  URLQuery extends Query = Query
>(
  fn: AsyncRequestHandler<Record<Params, string>, ReqBody, URLQuery>
): RequestHandler<Record<Params, string>, unknown, ReqBody, URLQuery> {
  return async (...args) => {
    const next = args[args.length-1] as NextFunction
    try {
      return await fn(...args)
    } catch (err) {
      next(new RouteError(args[0], err))
    }
  }
}

export default asyncErrorHandler
