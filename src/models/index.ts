import { Sequelize, Model, ModelCtor, BuildOptions } from 'sequelize'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { TaskFactory } from "./Task.js"
import { UserFactory } from "./User.js"

export interface ModelStatic<M extends Model> extends ModelCtor<M> {
  new(values?: M['_creationAttributes'], options?: BuildOptions): M
  associate(models: typeof Models): void
}

export type ModelFactory<M extends Model> =
  (sequelize: Sequelize) => ModelStatic<M>

// Use sqlite instead of real database for simplicity
const __dirname = dirname(fileURLToPath(import.meta.url))
const dbPath = process.env.DB_PATH === ':memory:'
  ? ':memory:'
  : join(__dirname, '../../', process.env.DB_PATH ?? '')
const sequelize = new Sequelize('sqlite:' + dbPath, {
  logging: false
})

export const Models = {
  Task: TaskFactory(sequelize),
  User: UserFactory(sequelize),
}

for (const model of Object.values(Models))
  model.associate?.(Models)

export default sequelize
export const {
  Task,
  User,
} = Models
