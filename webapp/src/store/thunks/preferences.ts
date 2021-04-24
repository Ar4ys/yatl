import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit"
import ky from "ky"
import { Options, createAuthThunkGuard } from "../../utils"
import {
  Preferences,
  setPreferences as setPreferencesAction,
  toggleDarkTheme as toggleDarkThemeAction
} from "../slices/preferences"

const authGuard = createAuthThunkGuard(
  ky.extend({ prefixUrl: '/user/preferences' })
)

export const getPreferences: AsyncThunk<Preferences, undefined, Options> =
  createAsyncThunk(
    'user/getPreferencesStatus',
    async (_value, { dispatch, getState }) => {
      const { ky } = authGuard(getState())
      const preferences = await ky.get("").json<Preferences>()
      dispatch(setPreferencesAction(preferences))
      return preferences
    })

export const toggleDarkTheme: AsyncThunk<Preferences, boolean, Options> =
  createAsyncThunk(
    'user/toggleDarkThemeStatus',
    async (value, { dispatch, getState }) => {
      const state = getState()
      const darkThemeState = value ?? !state.preferences.darkTheme
      dispatch(toggleDarkThemeAction(darkThemeState))
      const { ky } = authGuard(state)
      return await ky.patch("", {
        json: { darkTheme: darkThemeState }
      }).json<Preferences>()
    })
