import { createAsyncThunk } from '@reduxjs/toolkit'
import ky from 'ky'
import { Todo, TodoCreate, TodoUpdate } from '../slices/todos'

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
  async todo =>
    await kyTask.post('', { json: todo }).json<Todo>())

export const updateTodo = createAsyncThunk<Todo, TodoUpdate>(
  'todos/updateTodoStatus',
  async ({ id, todo }) => 
    await kyTask.patch(`${id}`, { json: todo }).json<Todo>())

export const deleteTodo = createAsyncThunk<number, number>(
  'todos/deleteTodoStatus',
  async id => 
    await kyTask.delete(`${id}`) && id)
