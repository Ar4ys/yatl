import { Router } from 'express'
import Sq from 'sequelize'
import catchAsync from '../middlewares/asyncErrorHandler.js'
import validate from '../middlewares/validate.js'
import { authValidation } from '../middlewares/auth.js'
import TaskService from '../services/Task.js'
import { Task, TaskCreationAttributes } from '../models/Task.js'
import {
  taskUUIDParamValidator,
  taskCreationBodyValidator,
  taskUpdateBodyValidator
} from '../validation/task.js'

const { UniqueConstraintError } = Sq
const router = Router()

router.route('/task')
  .all(authValidation())
  .get(catchAsync(async (req, res) => {
    const userGoogleId = req.user!.sub
    const allTasks = await TaskService.getAll(userGoogleId)
    res.status(200).send(allTasks)
  }))
  .post(
    validate(taskCreationBodyValidator()),
    catchAsync<TaskCreationAttributes>(async (req, res) => {
      const userGoogleId = req.user!.sub
      try {
        const task = await TaskService.create(userGoogleId, req.body)
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
  .all(validate(taskUUIDParamValidator()), authValidation())
  .get(catchAsync<void, "uuid">(async (req, res) => {
    const userGoogleId = req.user!.sub
    const { uuid } = req.params
    const task = await TaskService.get(userGoogleId, uuid)
    if (task)
      res.status(200).send(task)
    else
      res.sendStatus(404)
  }))
  .patch(
    validate(taskUpdateBodyValidator()),
    catchAsync<Partial<Task>, "uuid">(async (req, res) => {
      const userGoogleId = req.user!.sub
      const { uuid } = req.params
      const fields = req.body
      const updatedTask = await TaskService.update(userGoogleId, uuid, fields)
      if (updatedTask)
        res.status(200).send(updatedTask)
      else
        res.sendStatus(404)
    }))
  .delete(catchAsync<void, "uuid">(async (req, res) => {
    const userGoogleId = req.user!.sub
    const { uuid } = req.params
    const isDeleted = await TaskService.delete(userGoogleId, uuid)
    if (isDeleted)
      res.sendStatus(204)
    else
      res.sendStatus(404)
  }))

export default router
