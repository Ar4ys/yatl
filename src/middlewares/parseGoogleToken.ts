import jwt from 'jsonwebtoken'
import { validateGoogleToken } from './auth.js'
import asyncCatch from './asyncErrorHandler.js'

const { JsonWebTokenError } = jwt

export interface GoogleTokenBody {
  googleToken: string,
  googleId?: string
}

export function parseGoogleToken() {
  return asyncCatch<GoogleTokenBody>(async (req, res, next) => {
    const { googleToken } = req.body
    let googleId: string
    
    try {
      googleId = (await validateGoogleToken(googleToken)).sub
    } catch (e: unknown) {
      if (e instanceof JsonWebTokenError)
        return void res.status(401).send(e.message)
      else
        throw e
    }

    req.body.googleId = googleId
    next()
  })
}
