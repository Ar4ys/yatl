import { Router } from 'express'
import TaskService from '../services/task.js'

const router = Router()

router.route('/task')
  .get(async (_req, res, next) => {
    try {
      const allTasks = await TaskService.getAll()
      res.status(200).send(allTasks)
    } catch(e) {
      next(e)
    }
  })
  .post(async (req, res, next) => {
    try {
      const taskFields = req.body
      const taskId = await TaskService.create(taskFields)
      res.status(201).send({ id: taskId })
    } catch(e) {
      next(e)
    }
  })

router.route('/task/:id')
  .get(async (req, res, next) => {
    try {
      const id = +req.params.id
      const task = await TaskService.get(id)
      if (task)
        res.status(200).send(task)
      else
        res.sendStatus(404)
    } catch(e) {
      next(e)
    }
  })
  .patch(async (req, res, next) => {
    try {
      const id = +req.params.id
      const fields = req.body
      const [ amount ] = await TaskService.update(id, fields)
      if (amount === 0)
        res.sendStatus(404)
      else
        res.sendStatus(204)
    } catch(e) {
      next(e)
    }
  })
  .delete(async (req, res, next) => {
    try {
      const id = +req.params.id
      const amount = await TaskService.delete(id)
      if (amount === 0)
        res.sendStatus(404)
      else
        res.sendStatus(204)
    } catch(e) {
      next(e)
    }
  })

export default router
