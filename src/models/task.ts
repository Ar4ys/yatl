import Sq, { Optional } from 'sequelize'
import type { ModelFactory, ModelStatic } from "./index.js"

const { Model, DataTypes } = Sq

export interface TaskAttributes {
  id: number
  content: string
  color: string
  done: boolean
}

export interface TaskCreationAttributes
  extends Optional<TaskAttributes, "id" | "done"> {}

export class Task extends Model<TaskAttributes, TaskCreationAttributes>
  implements TaskAttributes {
  id!: number
  content!: string
  color!: string
  done!: boolean

  readonly createdAt!: Date
  readonly updatedAt!: Date
}

export const TaskFactory: ModelFactory<Task> = (sequelize) =>
  Task.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false
    },
    done: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  }, { sequelize }) as unknown as ModelStatic<Task>
// Need to do this convertion ^ because sequelize type is incorrect.
// Model.init() type returns Model instance, while actually it returns constructor
