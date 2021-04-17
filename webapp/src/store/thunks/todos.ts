import { createAsyncThunk, unwrapResult } from '@reduxjs/toolkit'
import ky from 'ky'
import store from '..'
import { RootState } from '../slices'
import {
  Todo, TodoCreate, TodoUpdate,
  addTodo as addTodoAction,
  // createTodo as createTodoAction,
  updateTodo as updateTodoAction,
  deleteTodo as deleteTodoAction
} from '../slices/todos'

const kyTask = ky.extend({
  prefixUrl: '/task'
})

export const getAllTodos = createAsyncThunk<Todo[]>(
  'todos/getAllTodosStatus',
  async () =>
    await kyTask.get('').json<Todo[]>())

export const getTodoById = createAsyncThunk<Todo, number>(
  'todos/getTodoByIdStatus',
  async id =>
    await kyTask.get(`${id}`).json<Todo>())

export const createTodo = createAsyncThunk<Todo, TodoCreate>(
  'todos/createTodoStatus',
  async (todo, { dispatch }) => {
    // dispatch(createTodoAction(todo))
    return await kyTask.post('', { json: todo }).json<Todo>()
  })

export const updateTodo = createAsyncThunk<Todo, TodoUpdate>(
  'todos/updateTodoStatus',
  async ({ id, todo }, { dispatch }) => {
    dispatch(updateTodoAction({ id, todo }))
    return await kyTask.patch(`${id}`, { json: todo }).json<Todo>()
  })

export const deleteTodo = createAsyncThunk<number, number, { state: RootState }>(
  'todos/deleteTodoStatus',
  async (id, { dispatch, getState }) => {
    dispatch(deleteTodoAction(id))
    // if (isTodoLocalOnly(getState, id))
    //   throw new Error(`Todo ${id} is localOnly`)
    return await kyTask.delete(`${id}`) && id
  })

// function isTodoLocalOnly(getState: typeof store.getState, id: number) {
//   return getState().todos.find(todo => todo.id === id)?.localOnly
// }

export const mergeLocalAndServerTodos = createAsyncThunk<void, void, { state: RootState }>(
  'todos/mergeLocalAndServerTodosStatus',
  async (_, { getState, dispatch }) => {
    const localTodos = [...getState().todos]
    let serverTodos = await dispatch(getAllTodos()).then(unwrapResult)

    localTodos.forEach(localTodo => {
      const { id } = localTodo
      const serverTodo = serverTodos.find(todo => todo.id === id)
      const localTodoUpdatedAt = new Date(localTodo.updatedAt)
      const serverTodoUpdatedAt = new Date(serverTodo?.updatedAt ?? 0)

      if (!serverTodo) {
        dispatch(createTodo(localTodo))
      } else if (localTodoUpdatedAt < serverTodoUpdatedAt) {
        serverTodos = serverTodos.filter(todo => todo.id !== id)
        dispatch(updateTodoAction({
          id,
          todo: serverTodo
        }))
      } else {
        serverTodos = serverTodos.filter(todo => todo.id !== id)
        dispatch(updateTodo({
          id,
          todo: localTodo
        }))
      }
    })

    console.log(serverTodos)

    if (serverTodos.length !== 0)
      serverTodos.forEach(todo => dispatch(addTodoAction(todo)))
  })
