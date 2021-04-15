import { Item } from "./Item"
import { Checkbox } from "./Checkbox"
import { Edit, Delete } from "./IconButtons"
import "../styles/TodoItemView.css"

const onDoneTodo = callback =>
  ({ target: { checked } }) =>
    callback(checked)

export function TodoItemView({ text, color, done, onDone, onEdit, onDelete }) {
  return <>
    <Item className={color + " " + (done ? "done" : "")}>
      <Checkbox checked={done} onChange={onDoneTodo(onDone)}/>
      <p>{text}</p>
      <Edit onClick={onEdit}/>
      <Delete onClick={onDelete}/>
    </Item>
  </>
}
