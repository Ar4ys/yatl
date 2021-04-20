import { Router } from 'express'
import Sq from 'sequelize'
import catchAsync from '../utils/asyncErrorHandler.js'
import TaskService from '../services/task.js'
import validate from '../utils/validate.js'
import { Task, TaskCreationAttributes } from '../models/task.js'
import {
  taskUUIDParamValidator,
  taskCreationBodyValidator,
  taskUpdateBodyValidator
} from '../validation/task.js'

const { UniqueConstraintError } = Sq
const router = Router()

router.route('/task')
  .get(catchAsync(async (_req, res) => {
    const allTasks = await TaskService.getAll()
    res.status(200).send(allTasks)
  }))
  .post(
    validate(taskCreationBodyValidator()),
    catchAsync<TaskCreationAttributes>(async (req, res) => {
      try {
        const task = await TaskService.create(req.body)
        res.status(201).send(task)
      } catch (e) {
        if (e instanceof UniqueConstraintError)
          res.status(400).send({
            msg: 'UUID must be unique',
            param: 'uuid',
            location: 'body'
          })
        else throw e
      }
    }))

router.route('/task/:uuid')
  .all(validate(taskUUIDParamValidator()))
  .get(catchAsync<void, "uuid">(async (req, res) => {
    const { uuid } = req.params
    const task = await TaskService.get(uuid)
    if (task)
      res.status(200).send(task)
    else
      res.sendStatus(404)
  }))
  .patch(
    validate(taskUpdateBodyValidator()),
    catchAsync<Partial<Task>, "uuid">(async (req, res) => {
      const { uuid } = req.params
      const fields = req.body
      const [ amount ] = await TaskService.update(uuid, fields)
      if (amount === 0)
        res.sendStatus(404)
      else
        res.status(200).send(await TaskService.get(uuid))
    }))
  .delete(catchAsync<void, "uuid">(async (req, res) => {
    const { uuid } = req.params
    const amount = await TaskService.delete(uuid)
    if (amount === 0)
      res.sendStatus(404)
    else
      res.sendStatus(204)
  }))

export default router
