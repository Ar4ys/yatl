import Sq, { Optional } from 'sequelize'
import type { ModelFactory, Models, ModelStatic } from "./index.js"

const { Model, DataTypes } = Sq

export interface UserAttributes {
  id: number
  name: string
}

export interface UserCreationAttributes
  extends Optional<UserAttributes, "id"> {}

// Test Model
export class User extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes {
  id!: number
  name!: string

  readonly createdAt!: Date
  readonly updatedAt!: Date
  
  static associate(models: typeof Models): void {
    User.hasMany(models.User)
  }
}

export const UserFactory: ModelFactory<User> = (sequelize) =>
  User.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      comment: 'It`s me, Mario',
    },
  }, { sequelize }) as unknown as ModelStatic<User>
// Need to do this convertion ^ because sequelize type is incorrect.
// Model.init() type returns Model instance, while actually it returns constructor
