import type { RequestHandler } from 'express'
import { validationResult, ValidationChain } from 'express-validator'

type Validator = ValidationChain | ValidationChain[]

function validate(...validators: Validator[]): RequestHandler[] {
  return [...validators.flat(), (req, res, next) => {
    const result = validationResult(req)
      .formatWith(({ msg, param, location }) => ({ msg, param, location }))

    if (result.isEmpty())
      return next()

    res.status(400).send(result.array())
  }]
}

export default validate
