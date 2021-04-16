import { useState, VFC } from "react"
import { useDispatch } from "react-redux"
import type { Todo } from "../store/slices/todos"
import { updateTodo as updateTodoAction, deleteTodo } from "../store/thunks/todos"
import { TodoItemView } from "./TodoItemView"
import { TodoItemEdit } from "./TodoItemEdit"
import { Color } from "../enums"

export interface TodoItemProps {
  id: number
  content: string
  color: Color
  done: boolean
  editing?: boolean
}

export const TodoItem: VFC<TodoItemProps> = ({ id, content, color, done, editing }) => {
  const [ isEditing, setEditing ] = useState(editing ?? false)
  const dispatch = useDispatch()
  const updateTodo = (todo: Partial<Todo>) => {
    dispatch(updateTodoAction({ id, todo }))
    setEditing(false)
  }
  
  return isEditing
    ? <TodoItemEdit
        onCancel={() => setEditing(false)}
        onAccept={updateTodo}
        {...{ content, color }}
      /> 
    : <TodoItemView
        onEdit={() => setEditing(true)}
        onDelete={() => dispatch(deleteTodo(id))}
        onDone={state => updateTodo({ done: state })}
        {...{ content, color, done }}
      />
}
