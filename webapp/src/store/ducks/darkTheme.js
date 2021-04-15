import { createSlice } from "../../utils"

const darkThemeSlice = createSlice({
  name: "darkTheme",
  initialState: false,
  reducers: {
    toggleDarkTheme: (state, darkTheme) => darkTheme ?? !state
  }
})

export default darkThemeSlice.reducer
export const { toggleDarkTheme } = darkThemeSlice.actions
