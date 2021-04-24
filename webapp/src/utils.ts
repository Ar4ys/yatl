import { NotLoginedError } from './errors'
import { RootState } from './store/slices'
import ky from 'ky'

export interface Options {
  state: RootState
}

export interface AuthOptions extends Options {
  extra: {
    ky: typeof ky
  }
}

export const createAuthThunkGuard = (kyAuth: typeof ky) =>
  ({ user }: RootState) => {
    if (!user.tokenId)
      throw new NotLoginedError()

    const ky = kyAuth.extend({
      headers: {
        Authorization: `Bearer ${user.tokenId}`
      }
    })

    return { ky }
  }
