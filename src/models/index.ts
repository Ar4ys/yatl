import { Sequelize, Model, ModelCtor, BuildOptions } from 'sequelize'
import { UserFactory } from "./user.js"

export interface ModelStatic<M extends Model> extends ModelCtor<M> {
  new(values?: M['_creationAttributes'], options?: BuildOptions): M
  associate(models: typeof Models): void
}

export type ModelFactory<M extends Model> =
  (sequelize: Sequelize) => ModelStatic<M>

// Use sqlite instead of real database for simplicity
const sequelize = new Sequelize("sqlite:db.sqlite")
export const Models = {
  User: UserFactory(sequelize),
}

for (const model of Object.values(Models))
  model.associate(Models)

export const {
  User,
} = Models
export default sequelize
