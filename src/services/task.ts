import { Task, TaskAttributes, TaskCreationAttributes } from '../models/task.js'

class TaskService {
  async get(id: number) {
    return Task.findOne({ where: { id } })
  }

  async getAll() {
    return Task.findAll()
  }

  async create(attributes: TaskCreationAttributes) {
    return Task.create(attributes)
  }

  async update(id: number, fields: Partial<TaskAttributes>) {
    return Task.update(fields, { where: { id }})
  }

  async delete(id: number) {
    return Task.destroy({ where: { id }})
  }
}

export default new TaskService()
