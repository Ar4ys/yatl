import { Sequelize, Model, ModelCtor, BuildOptions } from 'sequelize'
import { TaskFactory } from "./task.js"

export interface ModelStatic<M extends Model> extends ModelCtor<M> {
  new(values?: M['_creationAttributes'], options?: BuildOptions): M
  associate(models: typeof Models): void
}

export type ModelFactory<M extends Model> =
  (sequelize: Sequelize) => ModelStatic<M>

// Use sqlite instead of real database for simplicity
const sequelize = new Sequelize("sqlite:db.sqlite", {
  logging: false
})

export const Models = {
  Task: TaskFactory(sequelize),
}

for (const model of Object.values(Models))
  model.associate?.(Models)

export default sequelize
export const {
  Task,
} = Models
