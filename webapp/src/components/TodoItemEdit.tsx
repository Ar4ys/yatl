import { KeyboardEventHandler, useState, VFC } from "react"
import { Item } from "./Item"
import * as Button from "./IconButtons"
import { ColorPicker } from "./ColorPicker"
import { Color } from "../enums"
import { Todo } from "../store/slices/todos"

type TodoUpdate = Pick<Todo, 'content' | 'color'>
type InputKeyboardEventHandler = KeyboardEventHandler<HTMLInputElement>

export interface TodoItemEditProps {
  content: string
  color: Color
  onAccept: (payload: TodoUpdate) => void
  onCancel: () => void
}

export const TodoItemEdit: VFC<TodoItemEditProps> = props => {
  const [ content, setContent ] = useState(props.content)
  const [ color, setColor ] = useState(props.color)
  const [
    isColorPickerOpened,
    setColorPickerState
  ] = useState(false)

  const updateTodo = () =>
    props.onAccept({ content, color })

  const onKeyPress: InputKeyboardEventHandler = ({ key }) => {
    switch(key) {
      case "Escape":
        props.onCancel()
        break

      case "Enter":
        updateTodo()
        break
    }
  }

  return <>
    <Item className={color}>
      <Button.ColorPicker onClick={() => setColorPickerState(true)} />
      {isColorPickerOpened
        ? <ColorPicker
            onSelect={setColor}
            onBlur={() => setColorPickerState(false)}
            blurOnSelect
          />
        : undefined}
      <input
        type="text"
        value={content}
        onChange={({ target }) => setContent(target.value)}
        onKeyDown={onKeyPress}
        placeholder="Type some todo..."
        autoFocus
      />
      <Button.Accept onClick={updateTodo}/>
      <Button.Cancel onClick={props.onCancel}/>
    </Item>
  </>
}
