import { configureStore } from "@reduxjs/toolkit"
import reducer, { RootState } from "./slices"
import { saveStore } from "./localStorage";
import { getAllTodos } from "./thunks/todos";
import 'react-redux';

const store = configureStore({
  reducer,
  devTools: true
})

declare module 'react-redux' {
  interface DefaultRootState extends RootState {}
} 

store.subscribe(() => saveStore(store))
store.dispatch(getAllTodos())

export default store
export type { RootState }
