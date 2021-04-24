import { Router } from 'express'
import validate from '../middlewares/validate.js'
import asyncCatch from '../middlewares/asyncErrorHandler.js'
import {
  googleTokenBodyValidator,
  userPreferencesBodyValidator
} from '../validation/user.js'
import UserService from '../services/User.js'
import { GoogleTokenBody, parseGoogleToken } from '../middlewares/parseGoogleToken.js'
import { authValidation } from '../middlewares/auth.js'

const router = Router()

router.post('/user/login',
  validate(googleTokenBodyValidator()),
  parseGoogleToken(),
  asyncCatch<GoogleTokenBody>(async (req, res) => {
    const googleId = req.body.googleId as string
    const user = await UserService.getByGoogleId(googleId)
    if (user)
      res.status(200).send(user)
    else
      res.sendStatus(404)
  }))

router.post('/user/register',
  validate(googleTokenBodyValidator()),
  parseGoogleToken(),
  asyncCatch<GoogleTokenBody>(async (req, res) => {
    const googleId = req.body.googleId as string
    const user = await UserService.getByGoogleId(googleId)
    if (user)
      res.status(400).send('This googleId is already taken')
    else {
      const newUser = await UserService.create({ googleId })
      res.status(200).send(newUser)
    }
  }))

router.route('/user/preferences')
  .all(authValidation())
  .get(asyncCatch(async (req, res) => {
    const userGoogleId = req.user!.sub
    const user = await UserService.getByGoogleId(userGoogleId)
    if (user) {
      const { darkTheme } = user
      res.status(200).send({ darkTheme })
    } else
      res.sendStatus(404)
  }))
  .patch(
    validate(userPreferencesBodyValidator()),
    asyncCatch(async (req, res) => {
      const userGoogleId = req.user!.sub
      const user = await UserService.updatePreferences(userGoogleId, req.body)
      if (user) {
        const { darkTheme } = user
        res.status(200).send({ darkTheme })
      } else
        res.sendStatus(404)
    }))


export default router
