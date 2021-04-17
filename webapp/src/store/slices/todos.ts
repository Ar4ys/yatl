import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import * as Thunk from '../thunks/todos'
import type { Color } from "../../enums"
import { getFromLocalStorage } from "../localStorage"
import { v4 as makeUUID } from 'uuid'

export interface Todo {
  uuid: string
  content: string
  color: Color
  done: boolean
  updatedAt: string
}

export interface TodoUpdate {
  uuid: string
  todo: Partial<Todo>
}

export interface TodoCreate extends Pick<Todo, 'content' | 'color'> {}

export type TodoDelete = string

const todosSlice = createSlice({
  name: "todos",
  initialState: (getFromLocalStorage('todos') ?? []) as Todo[],
  reducers: {
    batchAddTodo: (_, { payload }: PayloadAction<Todo[]>) =>
      payload,

    addTodo: (todos, { payload }: PayloadAction<Todo>) => 
      void todos.push(payload),

    updateTodo: (todos, { payload }: PayloadAction<TodoUpdate>) =>
      void Object.assign(findTodo(todos, payload.uuid) ?? {}, payload.todo),

    deleteTodo: (todos, { payload: uuid }: PayloadAction<TodoDelete>) => 
      todos.filter(todo => todo.uuid !== uuid)
  },
  extraReducers: builder => builder
    .addCase(Thunk.createTodo.pending, (todos, { meta }) => 
      void todos.push({
        uuid: makeUUID(),
        done: false,
        updatedAt: new Date().toJSON(),
        ...meta.arg
      }))

    .addCase(Thunk.createTodo.fulfilled, (todos, { payload }) =>
      void Object.assign(
        findTodo(todos, payload.uuid) ?? {},
        pick(payload, ['updatedAt']),
      ))

    .addCase(Thunk.updateTodo.fulfilled, (todos, { payload }) =>
      void Object.assign(
        findTodo(todos, payload.uuid) ?? {},
        pick(payload, ['updatedAt'])
      ))
})

function findTodo(todos: Todo[], uuid: string) {
  return todos.find(todo => todo.uuid === uuid)
}

function pick<T extends Object>(obj: T, keys: (keyof T)[]) {
  const newObj: Partial<T> = {}
  for (const key of keys)
    newObj[key] = obj[key]
  return newObj
}

export default todosSlice.reducer
export const {
  addTodo,
  batchAddTodo,
  deleteTodo,
  updateTodo
} = todosSlice.actions
