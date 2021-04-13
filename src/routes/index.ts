import { Router } from 'express'
import TaskRouter from './task.js'

const router = Router()

router.get('/', (_req, res) => {
  res.render('index')
})

router.use(TaskRouter)

export default router
