import { useState, VFC } from "react"
import { useDispatch } from "react-redux"
import type { Todo } from "../store/slices/todos"
import { updateTodo as updateTodoAction, deleteTodo } from "../store/thunks/todos"
import { TodoItemView } from "./TodoItemView"
import { TodoItemEdit } from "./TodoItemEdit"
import { Color } from "../constants"

export interface TodoItemProps {
  uuid: string
  content: string
  color: Color
  done: boolean
  editing?: boolean
}

export const TodoItem: VFC<TodoItemProps> = ({ uuid, content, color, done, editing }) => {
  const [ isEditing, setEditing ] = useState(editing ?? false)
  const dispatch = useDispatch()
  const updateTodo = (todo: Partial<Todo>) => {
    dispatch(updateTodoAction({ uuid, todo }))
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
        onDelete={() => dispatch(deleteTodo(uuid))}
        onDone={state => updateTodo({ done: state })}
        {...{ content, color, done }}
      />
}
