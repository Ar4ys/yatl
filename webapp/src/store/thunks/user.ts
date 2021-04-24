import { GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login"
import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit"
import ky from 'ky'
import {
  Login,
  login as loginAction,
  logout as logoutAction
} from "../slices/user"
import { deleteAllTodos as deleteAllTodosAction } from "../slices/todos"
import { RootState } from "../slices"

interface Options {
  state: RootState
}

const kyUser = ky.extend({
  prefixUrl: '/'
})

export type GLoginResponse = GoogleLoginResponse | GoogleLoginResponseOffline
export const isGLoginOffline =
  (target: GLoginResponse): target is GoogleLoginResponse => !target.code

export const login: AsyncThunk<Login, GLoginResponse, Options> =
  createAsyncThunk(
    "user/loginStatus",
    async (googleResponse, { dispatch }) => {
      if (!isGLoginOffline(googleResponse)) throw new Error('Login offline')
      const { profileObj: user, tokenId } = googleResponse

      const response = await kyUser.post("login", {
        json: {
          googleToken: tokenId
        }
      }).catch(e => {
        if (e instanceof ky.HTTPError && e.response.status === 404)
          return dispatch(register(googleResponse))
        else
          throw e
      })

      // We got response 200 from POST /login or we registered successfully
      if (response instanceof Response
          || response.meta.requestStatus === "fulfilled") {
        dispatch(loginAction({ user, tokenId }))
        return { user, tokenId }
      }
      else
        throw new Error("Unable to login")
    })

export const register: AsyncThunk<Login, GLoginResponse, Options> =
  createAsyncThunk(
    "user/registerStatus",
    async (googleResponse, { dispatch }) => {
      if (!isGLoginOffline(googleResponse)) throw new Error('Login offline')
      const { profileObj: user, tokenId } = googleResponse

      await kyUser.post("register", {
        json: {
          googleToken: tokenId
        }
      })

      dispatch(loginAction({ user, tokenId }))
      return { user, tokenId }
  })

export const logout: AsyncThunk<void, undefined, Options> =
  createAsyncThunk(
    'user/logoutStatus',
    async (_, { dispatch }) => {
      dispatch(logoutAction())
      dispatch(deleteAllTodosAction())
    })
