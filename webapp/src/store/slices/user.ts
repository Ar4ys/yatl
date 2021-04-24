import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import * as Thunks from '../thunks/user'

export interface User {
  googleId: string
  imageUrl: string
  email: string
  name: string
  givenName: string
  familyName: string
}

export interface UserStore {
  user?: User
  tokenId?: string
  error?: Error
}

export interface Login {
  user: User
  tokenId: string
}

const userSlice = createSlice({
  name: "user",
  initialState: {} as UserStore,
  reducers: {
    login: (_state: UserStore, { payload }: PayloadAction<Login>) => payload,
    logout: () => ({})
  },
  extraReducers: builder => builder
    .addCase(Thunks.login.rejected, state =>
      void (state.error = {
        name: "LoginError",
        message: "Unable to Login"
      }))
    .addCase(Thunks.login.fulfilled, state =>
      void delete state.error)
})

export default userSlice.reducer
export const { login, logout } = userSlice.actions
