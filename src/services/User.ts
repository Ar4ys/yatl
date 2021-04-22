import { User, UserAttributes, UserCreationAttributes } from '../models/User.js'

class UserService {
  async get(id: number): Promise<User | null> {
    return await User.findByPk(id)
  }

  async getByGoogleId(googleId: string): Promise<User | null> {
    return await User.findOne({ where: { googleId }})
  }

  async getAll(): Promise<User[]> {
    return await User.findAll()
  }

  async create(attributes: UserCreationAttributes) {
    const { googleId } = attributes
    return await User.create({ googleId })
  }

  async update(
    id: number,
    fields: Partial<UserAttributes>
  ): Promise<User | undefined> {
    const { googleId } = fields
    return (await this.get(id))?.update({ googleId })
  }

  async delete(id: number): Promise<boolean> {
    const user = await this.get(id)
    return user ? !user.destroy() : false
  }
}

export default new UserService()
