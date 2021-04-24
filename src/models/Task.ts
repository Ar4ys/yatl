import Sq, { Optional } from 'sequelize'
import type { ModelFactory, Models, ModelStatic } from "./index.js"

const { Model, DataTypes } = Sq

export interface TaskAttributes {
  id: number
  uuid: string
  content: string
  color: string
  done: boolean
}

export interface TaskCreationAttributes
  extends Optional<TaskAttributes, "id" | "done"> {}

export class Task extends Model<TaskAttributes, TaskCreationAttributes>
  implements TaskAttributes {
  id!: number
  uuid!: string
  content!: string
  color!: string
  done!: boolean

  readonly createdAt!: Date
  readonly updatedAt!: Date

  static associate(models: typeof Models) {
    Task.belongsTo(models.User)
  }
}

export const TaskFactory: ModelFactory<Task> = (sequelize) =>
  Task.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    uuid: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
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
