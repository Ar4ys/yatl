import { Router } from 'express'
import TaskRouter from './task.js'
import UserRouter from './user.js'

const router = Router()

router.get('/', (_req, res) => {
  res.render('index')
})

router.use(TaskRouter)
router.use(UserRouter)

export default router
