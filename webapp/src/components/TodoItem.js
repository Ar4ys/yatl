import { useState } from "react"
import { useDispatch } from "react-redux"
import { updateTodo as updateTodoAction, deleteTodo } from "../store/ducks/todos"
import { TodoItemView } from "./TodoItemView"
import { TodoItemEdit } from "./TodoItemEdit"

export function TodoItem({ id, editing, text, color, done }) {
  const [ isEditing, setEditing ] = useState(editing)
  const dispatch = useDispatch()
  const updateTodo = todo => {
    dispatch(updateTodoAction({ id, ...todo }))
    setEditing(false)
  }
  
  return isEditing
    ? <TodoItemEdit
        onCancel={() => setEditing(false)}
        onAccept={updateTodo}
        {...{ text, color }}
      /> 
    : <TodoItemView
        onEdit={() => setEditing(true)}
        onDelete={() => dispatch(deleteTodo(id))}
        onDone={state => updateTodo({ done: state })}
        {...{ text, color, done }}
      />
}
