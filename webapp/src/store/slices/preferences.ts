import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getFromLocalStorage } from '../localStorage'

export interface Preferences {
  darkTheme: boolean
}

const defaultValue: Preferences = { darkTheme: true }

const preferencesSlice = createSlice({
  name: "preferences",
  initialState: getFromLocalStorage('preferences') as Preferences
    ?? defaultValue,
  reducers: {
    toggleDarkTheme: (
      state,
      { payload }: PayloadAction<boolean | undefined>
    ) => void (state.darkTheme = payload ?? !state.darkTheme),

    setPreferences: (_state, { payload }: PayloadAction<Preferences>) =>
      payload,

    setPreferencesToDefault: () => defaultValue
  }
})

export default preferencesSlice.reducer
export const {
  toggleDarkTheme,
  setPreferences,
  setPreferencesToDefault
} = preferencesSlice.actions
