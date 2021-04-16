import type { ChangeEventHandler, MouseEventHandler, VFC } from 'react'
import { Item } from "./Item"
import { Checkbox } from "./Checkbox"
import { Edit, Delete } from "./IconButtons"
import "../styles/TodoItemView.css"

export interface TodoItemViewProps {
  content: string
  color: string
  done: boolean
  onDone: (checked: boolean) => void
  onEdit: MouseEventHandler<HTMLButtonElement>
  onDelete: MouseEventHandler<HTMLButtonElement>
}

type InputChangeEventHandler = ChangeEventHandler<HTMLInputElement>

const onDoneTodo =
  (callback: TodoItemViewProps['onDone']): InputChangeEventHandler =>
    ({ target: { checked } }) =>
      callback(checked)

export const TodoItemView: VFC<TodoItemViewProps> =
  ({ content, color, done, onDone, onEdit, onDelete }) =>
    <>
      <Item className={color + " " + (done ? "done" : "")}>
        <Checkbox checked={done} onChange={onDoneTodo(onDone)}/>
        <p>{content}</p>
        <Edit onClick={onEdit}/>
        <Delete onClick={onDelete}/>
      </Item>
    </>
