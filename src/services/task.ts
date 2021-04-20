import { Task, TaskAttributes, TaskCreationAttributes } from '../models/task.js'

class TaskService {
  async get(uuid: string) {
    return Task.findOne({ where: { uuid } })
  }

  async getAll() {
    return Task.findAll()
  }

  async create(attributes: TaskCreationAttributes) {
    const { color, content, uuid, done } = attributes
    return Task.create({ color, content, uuid, done })
  }

  async update(uuid: string, fields: Partial<TaskAttributes>) {
    const { color, content, done } = fields
    return Task.update({ color, content, done }, { where: { uuid }})
  }

  async delete(uuid: string) {
    return Task.destroy({ where: { uuid }})
  }
}

export default new TaskService()
