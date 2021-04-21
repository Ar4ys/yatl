import { Task, TaskAttributes, TaskCreationAttributes } from '../models/Task.js'
import UserService from './User.js'

class TaskService {
  async get(userId: number, taskUUID: string): Promise<Task | undefined> {
    const user = await UserService.get(userId)
    const [ task ] = await user?.getTasks({ where: { uuid: taskUUID } }) ?? []
    return task
  }

  async getAll(userId: number): Promise<Task[] | undefined> {
    const user = await UserService.get(userId)
    return user?.getTasks()
  }

  async create(userId: number, attributes: TaskCreationAttributes) {
    const { color, content, uuid, done } = attributes
    const user = await UserService.get(userId)
    return user?.createTask({ color, content, uuid, done })
  }

  async update(
    userId:number,
    taskUUID: string,
    fields: Partial<TaskAttributes>
  ): Promise<Task | undefined> {
    const { color, content, done } = fields
    const task = await this.get(userId, taskUUID)
    return task?.update({ color, content, done })
  }

  async delete(userId: number, taskUUID: string): Promise<boolean> {
    const task = await this.get(userId, taskUUID)
    return task ? !task.destroy() : false
  }
}

export default new TaskService()
