import { Router } from 'express'
import catchAsync from 'express-async-handler'
import TaskService from '../services/task.js'

const router = Router()

router.route('/task')
  .get(catchAsync(async (_req, res) => {
    const allTasks = await TaskService.getAll()
    res.status(200).send(allTasks)
  }))
  .post(catchAsync(async (req, res) => {
    const taskFields = req.body
    const taskId = await TaskService.create(taskFields)
    res.status(201).send({ id: taskId })
  }))

router.route('/task/:id')
  .get(catchAsync(async (req, res) => {
    const id = +req.params.id
    const task = await TaskService.get(id)
    if (task)
      res.status(200).send(task)
    else
      res.sendStatus(404)
  }))
  .patch(catchAsync(async (req, res) => {
    const id = +req.params.id
    const fields = req.body
    const [ amount ] = await TaskService.update(id, fields)
    if (amount === 0)
      res.sendStatus(404)
    else
      res.sendStatus(204)
  }))
  .delete(catchAsync(async (req, res) => {
    const id = +req.params.id
    const amount = await TaskService.delete(id)
    if (amount === 0)
      res.sendStatus(404)
    else
      res.sendStatus(204)
  }))

export default router
