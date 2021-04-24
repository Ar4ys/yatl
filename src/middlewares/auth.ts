import expressJWT, { Options } from 'express-jwt'
import jwt, { Algorithm } from 'jsonwebtoken'
import got from 'got'
import { ErrorWraper } from '../utils/errors.js'
import { isUserExists } from './isUserExists.js'

const { verify, decode } = jwt

declare global {
  namespace Express {
    interface User {
      sub: string
    }
  }
}

export interface GoogleTokenHeader {
  kid: string
}

export interface GoogleTokenBody {
  sub: string
}

interface RsaPublicKeyStore {
  expirationDate: number,
  keys: Record<string, string>
}

const rsaPubKeys: RsaPublicKeyStore = {
  expirationDate: 0,
  keys: {}
}

const convertMaxAgeToExpirationDate = (maxAge: number) =>
  Date.now() + (maxAge * 1000)

export const fetchLatestRsaPubKey = async () => {
  try {
    const certificateURI = 'https://www.googleapis.com/oauth2/v1/certs'
    const response = await got.get<RsaPublicKeyStore['keys']>(
      certificateURI,
      { responseType: 'json' })
    const maxAge = response
      .headers['cache-control']
      ?.match(/max-age=(\d+)/)?.[1]

    if (!maxAge)
      throw new Error('Header["cache-control"].max-age is undefined')
    
    rsaPubKeys.expirationDate = convertMaxAgeToExpirationDate(+maxAge)
    rsaPubKeys.keys = response.body
  } catch (e) {
      throw new ErrorWraper('Could not get Google Rsa Pub keys.', e)
  }
}

export const getLatestRsaPubKey = async (keyId: string) => {
  if (rsaPubKeys.expirationDate < Date.now())
    await fetchLatestRsaPubKey()
  return rsaPubKeys.keys[keyId]
}

export const getSecretFromToken = (token: string) =>
  getLatestRsaPubKey(decode(token, { complete: true })?.header?.kid)

// Need set type of algorithms to jwt.Algorithm[],
// because express-jwt.Options is not compatible with jwt.VerifyOptions
export const jwtOptions: Options & { algorithms: Algorithm[] } = {
  algorithms: ["RS256"],
  secret: (_req, { kid }: GoogleTokenHeader, _payload, done) =>
    getLatestRsaPubKey(kid)
      .then(key => key
        ? done(null, key)
        : done('Key id is invalid')),
  audience: process.env.GOOGLE_ID,
  issuer: ['accounts.google.com', 'https://accounts.google.com'],
}

export const validateGoogleToken =
  async (token: string): Promise<GoogleTokenBody> =>
    verify(
      token,
      await getSecretFromToken(token),
      jwtOptions
    ) as GoogleTokenBody

export const authValidation = (options: Partial<Options> = {}) =>
  [ expressJWT({ ...jwtOptions, ...options }), isUserExists() ]
