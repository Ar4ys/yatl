import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addTodo as addTodoAction } from "../store/ducks/todos"
import { toggleDarkTheme } from "../store/ducks/darkTheme"
import { Item } from "./Item"
import * as Button from "./IconButtons"
import { ColorPicker } from "./ColorPicker"
import { allColors } from "../utils"
import "../styles/TodoItem.css"

export function TodoForm() {
  const [ text, setText ] = useState("")
  const [ color, setColor ] = useState("default")
  const [
    isColorPickerOpened,
    setColorPickerState
  ] = useState(false)
  const darkTheme = useSelector(state => state.darkTheme)
  const dispatch = useDispatch()

  const addTodo = () => {
    dispatch(addTodoAction({ text, color }))
    setText("")
    setColor("default")
  }

  const onKeyPress = ({ key }) =>
    key === "Enter" && addTodo()

  return <>
    <Item className={`todo-form ${color}`}>
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
      />
      <Button.Accept onClick={addTodo}/>
      {darkTheme
        ? <Button.LightTheme onClick={() => dispatch(toggleDarkTheme(false))}/>
        : <Button.DarkTheme onClick={() => dispatch(toggleDarkTheme(true))}/>}
    </Item>
  </>
}
