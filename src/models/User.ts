import Sq, {
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  Optional
} from 'sequelize'
import type { ModelFactory, Models, ModelStatic } from "./index.js"
import type { Task } from './Task.js'

const { Model, DataTypes } = Sq

export interface UserAttributes {
  id: number
  googleId: string
}

export interface UserCreationAttributes
  extends Optional<UserAttributes, "id"> {}

export class User extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes {
  id!: number
  googleId!: string

  readonly createdAt!: Date
  readonly updatedAt!: Date

  getTasks!: HasManyGetAssociationsMixin<Task>
  createTask!: HasManyCreateAssociationMixin<Task>

  readonly tasks?: Task[]

  static associate(models: typeof Models) {
    User.hasMany(models.Task)
  }
}

export const UserFactory: ModelFactory<User> = (sequelize) =>
  User.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    googleId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, { sequelize }) as unknown as ModelStatic<User>
// Need to do this convertion ^ because sequelize type is incorrect.
// Model.init() type returns Model instance, while actually it returns constructor
