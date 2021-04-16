import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const darkThemeSlice = createSlice({
  name: "darkTheme",
  initialState: false,
  reducers: {
    toggleDarkTheme: (state: boolean, { payload }: PayloadAction<boolean>) =>
      payload ?? !state
  }
})

export default darkThemeSlice.reducer
export const { toggleDarkTheme } = darkThemeSlice.actions
