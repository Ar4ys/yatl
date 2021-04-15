import { createSlice } from "../../utils"

const todosSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodo: (todos, { text, color }) => {
      todos.push({
        id: (todos[todos.length-1] ?? -1) + 1,
        text: text,
        color,
        done: false
      })
      return todos
    },

    updateTodo: (todos, todo) => {
      Object.assign(findTodo(todos, todo.id), todo)
      return todos
    },

    deleteTodo: (todos, id) =>
      todos.filter(todo => todo.id !== id)
  }
})

function findTodo(todos, id) {
  return todos.find(todo => todo.id === id)
}

export default todosSlice.reducer
export const { addTodo, updateTodo, deleteTodo } = todosSlice.actions
