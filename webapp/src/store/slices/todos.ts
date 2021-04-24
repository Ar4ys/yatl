import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import * as Thunk from '../thunks/todos'
import type { Color } from "../../constants"
import { getFromLocalStorage } from "../localStorage"

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

export interface TodoAdd
  extends Pick<Todo, 'uuid' | 'content' | 'color'> {}

export type TodoDelete = string

const todosSlice = createSlice({
  name: "todos",
  initialState: (getFromLocalStorage('todos') ?? []) as Todo[],
  reducers: {
    batchAddTodo: (_, { payload }: PayloadAction<Todo[]>) =>
      payload,

    addTodo: (todos, { payload }: PayloadAction<TodoAdd>) => 
      void todos.push({
        done: false,
        updatedAt: new Date().toJSON(),
        ...payload
      }),

    updateTodo: (todos, { payload }: PayloadAction<TodoUpdate>) =>
      void Object.assign(findTodo(todos, payload.uuid) ?? {}, payload.todo),

    deleteTodo: (todos, { payload: uuid }: PayloadAction<TodoDelete>) => 
      todos.filter(todo => todo.uuid !== uuid),

    deleteAllTodos: () => []
  },
  extraReducers: builder => builder
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
  deleteAllTodos,
  updateTodo
} = todosSlice.actions
