import { useState } from "react"
import { Item } from "./Item"
import * as Button from "./IconButtons"
import { ColorPicker } from "./ColorPicker"
import { allColors } from "../utils"

export function TodoItemEdit(props) {
  const [ text, setText ] = useState(props.text)
  const [ color, setColor ] = useState(props.color)
  const [
    isColorPickerOpened,
    setColorPickerState
  ] = useState(false)

  const updateTodo = () =>
    props.onAccept({ text, color })

  const onKeyPress = ({ key }) => {
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
            colors={allColors}
            color={color}
            onSelect={setColor}
            onBlur={() => setColorPickerState(false)}
            blurOnSelect
          />
        : undefined}
      <input
        type="text"
        value={text}
        onChange={({ target }) => setText(target.value)}
        onKeyDown={onKeyPress}
        placeholder="Type some todo..."
        autoFocus
      />
      <Button.Accept onClick={updateTodo}/>
      <Button.Cancel onClick={props.onCancel}/>
    </Item>
  </>
}
