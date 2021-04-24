import { body } from 'express-validator'

export function googleTokenBodyValidator() {
  return body('googleToken').isJWT().notEmpty()
}

export function userPreferencesBodyValidator() {
  return body('darkTheme').isBoolean()
}
