import { combineReducers } from "redux"
import darkTheme from "./darkTheme"
import todos from "./todos"

export default combineReducers({ todos, darkTheme })
