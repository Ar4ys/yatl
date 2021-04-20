import { User, UserAttributes, UserCreationAttributes } from '../models/User.js'
import generateToken from '../utils/generateToken.js'

class UserService {
  async get(id: number): Promise<User | null> {
    return await User.findByPk(id)
  }

  async getAll(): Promise<User[]> {
    return await User.findAll()
  }

  async create(attributes?: UserCreationAttributes) {
    let restoreToken: string
    if (attributes)
      restoreToken = attributes.restoreToken
    else
      restoreToken = await this.generateUserRestoreToken()

    return await User.create({ restoreToken })
  }

  async update(
    id: number,
    fields: Partial<UserAttributes>
  ): Promise<User | undefined> {
    const { restoreToken } = fields
    return (await this.get(id))?.update({ restoreToken })
  }

  async updateRestoreToken(id: number): Promise<string> {
    const restoreToken = await this.generateUserRestoreToken()
    await this.update(id, { restoreToken })
    return restoreToken
  }

  async delete(id: number): Promise<boolean> {
    const user = await this.get(id)
    return user ? !user.destroy() : false
  }

  private async generateUserRestoreToken() {
    let restoreToken: string
    do {
      restoreToken = generateToken(6)
    } while (!await User.findOne({ where: { restoreToken } }))
    return restoreToken
  }
}

export default new UserService()
