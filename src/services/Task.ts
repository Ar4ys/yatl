import { Task, TaskAttributes, TaskCreationAttributes } from '../models/Task.js'
import UserService from './User.js'

class TaskService {
  async get(userGoogleId: string, taskUUID: string): Promise<Task | undefined> {
    const user = await UserService.getByGoogleId(userGoogleId)
    const [ task ] = await user?.getTasks({ where: { uuid: taskUUID } }) ?? []
    return task
  }

  async getAll(userGoogleId: string): Promise<Task[] | undefined> {
    const user = await UserService.getByGoogleId(userGoogleId)
    return user?.getTasks()
  }

  async create(userGoogleId: string, attributes: TaskCreationAttributes) {
    const { color, content, uuid, done } = attributes
    const user = await UserService.getByGoogleId(userGoogleId)
    return user?.createTask({ color, content, uuid, done })
  }

  async update(
    userGoogleId: string,
    taskUUID: string,
    fields: Partial<TaskAttributes>
  ): Promise<Task | undefined> {
    const { color, content, done } = fields
    const task = await this.get(userGoogleId, taskUUID)
    return task?.update({ color, content, done })
  }

  async delete(userGoogleId: string, taskUUID: string): Promise<boolean> {
    const task = await this.get(userGoogleId, taskUUID)
    return task ? !task.destroy() : false
  }
}

export default new TaskService()
