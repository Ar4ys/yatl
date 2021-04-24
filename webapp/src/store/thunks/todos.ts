import { AsyncThunk, createAsyncThunk, unwrapResult } from '@reduxjs/toolkit'
import { Options, createAuthThunkGuard } from '../../utils'
import { v4 as makeUUID } from 'uuid'
import ky from 'ky'

import {
  Todo, TodoAdd, TodoUpdate,
  addTodo as addTodoAction,
  updateTodo as updateTodoAction,
  deleteTodo as deleteTodoAction,
  TodoDelete
} from '../slices/todos'

interface TodoCreateThunk extends Omit<TodoAdd, 'uuid'> {
  serverOnly?: boolean
}

const kyTask = ky.extend({
  prefixUrl: '/task'
})

const authGuard = createAuthThunkGuard(kyTask)

export const getAllTodos: AsyncThunk<Todo[], void, Options> =
  createAsyncThunk(
    'todos/getAllTodosStatus',
    async (_, { getState }) => {
      const { ky } = authGuard(getState())
      return await ky.get('').json<Todo[]>()
    })

export const getTodoById: AsyncThunk<Todo, number, Options> =
  createAsyncThunk(
    'todos/getTodoByIdStatus',
    async (id, { getState }) => {
      const { ky } = authGuard(getState())
      return await ky.get(`${id}`).json<Todo>()
    })

export const createTodo: AsyncThunk<Todo, TodoCreateThunk, Options> =
  createAsyncThunk(
    'todos/createTodoStatus',
    async (todo, { dispatch, getState }) => {
      const { serverOnly } = todo
      delete todo.serverOnly
      
      const payload = { uuid: makeUUID(), ...todo }
      !serverOnly && dispatch(addTodoAction(payload))
      const { ky } = authGuard(getState())
      
      return await ky.post('', { json: payload }).json<Todo>()
    })

export const updateTodo: AsyncThunk<Todo, TodoUpdate, Options> =
  createAsyncThunk(
    'todos/updateTodoStatus',
    async ({ uuid, todo }, { dispatch, getState }) => {
      dispatch(updateTodoAction({ uuid, todo }))
      const { ky } = authGuard(getState())
      return await ky.patch(`${uuid}`, { json: todo }).json<Todo>()
    })

export const deleteTodo: AsyncThunk<TodoDelete, TodoDelete, Options> =
  createAsyncThunk(
    'todos/deleteTodoStatus',
    async (uuid, { dispatch, getState }) => {
      dispatch(deleteTodoAction(uuid))
      const { ky } = authGuard(getState())
      return await ky.delete(`${uuid}`) && uuid
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
          dispatch(createTodo({ serverOnly: true, ...localTodo }))
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
