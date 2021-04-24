import { combineReducers } from "redux"
import preferences from "./preferences"
import todos from "./todos"
import user from "./user"

const reducer = combineReducers({ todos, preferences, user })

export default reducer
export type RootState = ReturnType<typeof reducer>
