import { combineReducers } from "redux"
import darkTheme from "./darkTheme"
import todos from "./todos"

const reducer = combineReducers({ todos, darkTheme })

export default reducer
export type RootState = ReturnType<typeof reducer>
