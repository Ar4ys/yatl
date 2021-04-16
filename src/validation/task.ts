import { body, param } from 'express-validator'

export function taskIdParamValidator() {
  return param('id')
    .toInt()
    .isInt()
}

export function taskCreationBodyValidator() {
  return [
    body('content').trim().isString(),
    body('color').trim().isString().notEmpty(),
    body('done').isBoolean().optional()
  ]
}

export function taskUpdateBodyValidator() {
  return [
    ...taskCreationBodyValidator().map(rule => rule.optional()),
    notEmptyBodyValidator()
  ]
}

export function notEmptyBodyValidator() {
  return body()
    .isObject()
    .custom(body => Object.keys(body).length !== 0)
}
