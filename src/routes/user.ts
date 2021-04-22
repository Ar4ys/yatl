import { Router } from 'express'
import validate from '../middlewares/validate.js'
import asyncCatch from '../middlewares/asyncErrorHandler.js'
import { googleTokenBodyValidator } from '../validation/user.js'
import UserService from '../services/User.js'
import { GoogleTokenBody, parseGoogleToken } from '../middlewares/parseGoogleToken.js'

const router = Router()

router.post('/login',
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

router.post('/register',
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

export default router
