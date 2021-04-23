import { KeyboardEventHandler, useState, VFC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons"
import { faGoogle } from "@fortawesome/free-brands-svg-icons"
import { createTodo } from "../store/thunks/todos"
import { toggleDarkTheme } from "../store/slices/darkTheme"
import { Item } from "./Item"
import * as Button from "./IconButtons"
import { ColorPicker } from "./ColorPicker"
import { SettingsMenu } from "./SettingsMenu"
import { SettingsItem } from "./SettingsItem"
import { Color } from "../enums"
import "../styles/TodoItem.css"

type InputKeyboardHandler = KeyboardEventHandler<HTMLInputElement>

export const TodoForm: VFC = () => {
  const [ content, setContent ] = useState("")
  const [ color, setColor ] = useState(Color.Defualt)
  const [
    isColorPickerOpened,
    setColorPickerState
  ] = useState(false)
  const [
    isSettingMenuOpened,
    setSettingMenuState
  ] = useState(false)
  const darkTheme = useSelector(state => state.darkTheme)
  const dispatch = useDispatch()

  const addTodo = () => {
    dispatch(createTodo({ content, color }))
    setContent("")
    setColor(Color.Defualt)
  }

  const onKeyPress: InputKeyboardHandler = ({ key }) =>
    key === "Enter" && addTodo()

  return <>
    <Item className={`todo-form ${color}`}>
      <Button.ColorPicker onClick={() => setColorPickerState(true)} />
      {isColorPickerOpened
        ? <ColorPicker
            color={color}
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
      />
      <Button.Accept onClick={addTodo}/>
      <Button.Settings onClick={() => setSettingMenuState(!isSettingMenuOpened)} />
      {isSettingMenuOpened &&
        <SettingsMenu onClose={() => setSettingMenuState(false)}>
          {darkTheme
            ? <SettingsItem
                label="Light theme"
                icon={faSun}
                onClick={() => dispatch(toggleDarkTheme(false))}
              />
            : <SettingsItem
                label="Dark theme"
                icon={faMoon}
                onClick={() => dispatch(toggleDarkTheme(true))}
              />}
          <SettingsItem
            label="Login"
            icon={faGoogle}
            onClick={() => alert("login")} />
        </SettingsMenu>
      }
    </Item>
  </>
}
