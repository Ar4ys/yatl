import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Color } from "../../enums"

export interface Todo {
  id: number
  content: string
  color: Color
  done: boolean
}

export interface TodoUpdate extends Partial<Todo> {
  id: number
}

export interface TodoCreate extends Pick<Todo, 'content' | 'color'> {}

const getNextId = ((id) => () => ++id)(0)

const todosSlice = createSlice({
  name: "todos",
  initialState: [] as Todo[],
  reducers: {
    addTodo: (todos, { payload }: PayloadAction<Todo>) => {
      todos.push(payload)
      return todos
    },

    // Temporary reducer, will gone after integration with backend
    createTodo: (todos, { payload }: PayloadAction<TodoCreate>) => {
      todos.push({
        id: getNextId(),
        done: false,
        ...payload
      })
      return todos
    },

    updateTodo: (todos, { payload }: PayloadAction<TodoUpdate>) => {
      Object.assign(findTodo(todos, payload.id), payload)
      return todos
    },

    deleteTodo: (todos, { payload: id }: PayloadAction<number>) =>
      todos.filter(todo => todo.id !== id)
  }
})

function findTodo(todos: Todo[], id: number) {
  return todos.find(todo => todo.id === id)
}

export default todosSlice.reducer
export const { addTodo, createTodo, updateTodo, deleteTodo } = todosSlice.actions
