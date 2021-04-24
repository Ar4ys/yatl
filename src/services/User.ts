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
    id: number | string,
    fields: Partial<UserAttributes>
  ): Promise<User | undefined> {
    const user = (typeof id === 'number')
      ? await this.get(id)
      : await this.getByGoogleId(id)
    return user?.update(fields)
  }

  async changeGoogleId(
    id: number | string,
    { googleId }: Pick<UserAttributes, 'googleId'>
  ): Promise<User | undefined> {
    return await this.update(id, { googleId })
  }

  async updatePreferences(
    id: number | string,
    preferences: Pick<UserAttributes, 'darkTheme'>
  ): Promise<User | undefined> {
    const { darkTheme } = preferences
    return await this.update(id, { darkTheme })
  }

  async delete(id: number): Promise<boolean> {
    const user = await this.get(id)
    return user ? !user.destroy() : false
  }
}

export default new UserService()
