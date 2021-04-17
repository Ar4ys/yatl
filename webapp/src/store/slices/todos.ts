import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import * as Thunk from '../thunks/todos'
import type { Color } from "../../enums"
import { getFromLocalStorage } from "../localStorage"

export interface Todo {
  id: number
  content: string
  color: Color
  done: boolean
  updatedAt: string
  localOnly: boolean | string
}

export interface TodoUpdate {
  id: number
  todo: Partial<Todo>
}

export interface TodoCreate extends Pick<Todo, 'content' | 'color'> {}

const todosSlice = createSlice({
  name: "todos",
  initialState: (getFromLocalStorage('todos') ?? []) as Todo[],
  reducers: {
    batchAddTodo: (_todos, { payload }: PayloadAction<Todo[]>) =>
      payload,

    // createTodo: (todos, { payload }: PayloadAction<TodoCreate>) =>
    //   void todos.push({
    //     // Temporary id. Actual id is generated on backend
    //     id: todos.length ? todos[todos.length-1].id+1 : 1,
    //     done: false,
    //     updatedAt: new Date().toJSON(),
    //     localOnly: true,
    //     ...payload
    //   }),

    addTodo: (todos, { payload }: PayloadAction<Todo>) => 
      void todos.push(payload),

    updateTodo: (todos, { payload }: PayloadAction<TodoUpdate>) =>
      void Object.assign(findTodo(todos, payload.id) ?? {}, payload.todo),

    deleteTodo: (todos, { payload: id }: PayloadAction<number>) => 
      todos.filter(todo => todo.id !== id)
  },
  extraReducers: builder => builder
    .addCase(Thunk.createTodo.pending, (todos, { meta }) => 
      void todos.push({
        // Temporary id. Actual id is generated on backend
        id: todos.length ? todos[todos.length-1].id+1 : 1,
        done: false,
        updatedAt: new Date().toJSON(),
        localOnly: meta.requestId,
        ...meta.arg
      }))

    .addCase(Thunk.createTodo.fulfilled, (todos, { payload, meta }) =>
      void Object.assign(
        todos.find(todo => todo.localOnly === meta.requestId) ?? {},
        pick(payload, ['id', 'updatedAt']),
        { localOnly: false }
      ))

    .addCase(Thunk.updateTodo.fulfilled, (todos, { payload }) =>
      void Object.assign(
        findTodo(todos, payload.id) ?? {},
        pick(payload, ['updatedAt'])
      ))
})

function findTodo(todos: Todo[], id: number) {
  return todos.find(todo => todo.id === id)
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
  // createTodo,
  deleteTodo,
  updateTodo
} = todosSlice.actions
