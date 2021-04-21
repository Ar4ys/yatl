import { body } from 'express-validator'

export function googleTokenBodyValidator() {
  return body('googleToken').isJWT().notEmpty()
}
