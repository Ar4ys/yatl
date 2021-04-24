import { combineReducers } from "redux"
import darkTheme from "./darkTheme"
import todos from "./todos"
import user from "./user"

const reducer = combineReducers({ todos, darkTheme, user })

export default reducer
export type RootState = ReturnType<typeof reducer>
