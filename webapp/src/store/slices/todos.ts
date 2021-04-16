import { createSlice } from "@reduxjs/toolkit"
import * as Thunk from '../thunks/todos'
import type { Color } from "../../enums"

export interface Todo {
  id: number
  content: string
  color: Color
  done: boolean
}

export interface TodoUpdate {
  id: number
  todo: Partial<Todo>
}

export interface TodoCreate extends Pick<Todo, 'content' | 'color'> {}

const todosSlice = createSlice({
  name: "todos",
  initialState: [] as Todo[],
  reducers: {},
  extraReducers: builder => builder
    .addCase(Thunk.getAllTodos.fulfilled, (_todos, { payload }) =>
      payload)

    .addCase(Thunk.createTodo.fulfilled, (todos, { payload }) =>
      void todos.push(payload))

    .addCase(Thunk.updateTodo.fulfilled, (todos, { payload }) =>
      void Object.assign(findTodo(todos, payload.id), payload))

    .addCase(Thunk.deleteTodo.fulfilled, (todos, { payload: id }) =>
      todos.filter(todo => todo.id !== id))
})

function findTodo(todos: Todo[], id: number) {
  return todos.find(todo => todo.id === id)
}

export default todosSlice.reducer
