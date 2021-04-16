import { configureStore } from "@reduxjs/toolkit"
import reducer, { RootState } from "./slices"
import 'react-redux';

const store = configureStore({
  reducer,
  devTools: true
})

declare module 'react-redux' {
  interface DefaultRootState extends RootState {}
} 

export default store


