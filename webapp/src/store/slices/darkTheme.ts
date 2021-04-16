import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getFromLocalStorage } from '../localStorage'

const darkThemeSlice = createSlice({
  name: "darkTheme",
  initialState: getFromLocalStorage('darkTheme') as boolean ?? false,
  reducers: {
    toggleDarkTheme: (state: boolean, { payload }: PayloadAction<boolean>) =>
      payload ?? !state
  }
})

export default darkThemeSlice.reducer
export const { toggleDarkTheme } = darkThemeSlice.actions
