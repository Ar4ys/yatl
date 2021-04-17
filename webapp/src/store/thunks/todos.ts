import { AsyncThunk, createAsyncThunk, unwrapResult } from '@reduxjs/toolkit'
import ky from 'ky'
import { RootState } from '../slices'
import {
  Todo, TodoCreate, TodoUpdate,
  addTodo as addTodoAction,
  updateTodo as updateTodoAction,
  deleteTodo as deleteTodoAction,
  TodoDelete
} from '../slices/todos'

interface Options {
  state: RootState
}

const kyTask = ky.extend({
  prefixUrl: '/task'
})

export const getAllTodos: AsyncThunk<Todo[], void, Options> =
  createAsyncThunk(
    'todos/getAllTodosStatus',
    async () =>
      await kyTask.get('').json<Todo[]>())

export const getTodoById: AsyncThunk<Todo, number, Options> =
  createAsyncThunk(
    'todos/getTodoByIdStatus',
    async id =>
      await kyTask.get(`${id}`).json<Todo>())

export const createTodo: AsyncThunk<Todo, TodoCreate, Options> =
  createAsyncThunk(
    'todos/createTodoStatus',
    async todo =>
      await kyTask.post('', { json: todo }).json<Todo>())

export const updateTodo: AsyncThunk<Todo, TodoUpdate, Options> =
  createAsyncThunk(
    'todos/updateTodoStatus',
    async ({ uuid, todo }, { dispatch }) => {
      dispatch(updateTodoAction({ uuid, todo }))
      return await kyTask.patch(`${uuid}`, { json: todo }).json<Todo>()
    })

export const deleteTodo: AsyncThunk<TodoDelete, TodoDelete, Options> =
  createAsyncThunk(
    'todos/deleteTodoStatus',
    async (uuid, { dispatch }) => {
      dispatch(deleteTodoAction(uuid))
      return await kyTask.delete(`${uuid}`) && uuid
    })

export const mergeLocalAndServerTodos: AsyncThunk<void, void, Options> =
  createAsyncThunk(
    'todos/mergeLocalAndServerTodosStatus',
    async (_, { getState, dispatch }) => {
      const localTodos = [...getState().todos]
      let serverTodos = await dispatch(getAllTodos()).then(unwrapResult)

      localTodos.forEach(localTodo => {
        const { uuid } = localTodo
        const serverTodo = serverTodos.find(todo => todo.uuid === uuid)
        const localTodoUpdatedAt = new Date(localTodo.updatedAt)
        const serverTodoUpdatedAt = new Date(serverTodo?.updatedAt ?? 0)

        if (!serverTodo) {
          dispatch(createTodo(localTodo))
        } else if (localTodoUpdatedAt < serverTodoUpdatedAt) {
          serverTodos = serverTodos.filter(todo => todo.uuid !== uuid)
          dispatch(updateTodoAction({
            uuid,
            todo: serverTodo
          }))
        } else {
          serverTodos = serverTodos.filter(todo => todo.uuid !== uuid)
          dispatch(updateTodo({
            uuid,
            todo: localTodo
          }))
        }
      })

    if (serverTodos.length !== 0)
      serverTodos.forEach(todo => dispatch(addTodoAction(todo)))
  })
