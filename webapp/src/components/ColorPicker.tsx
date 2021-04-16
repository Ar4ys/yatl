import { useRef, useEffect, VFC, FormEventHandler } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import "../styles/ColorPicker.css"
import { Color } from "../enums"

type FormChangeHandler = FormEventHandler<HTMLFormElement>

export interface ColorPickerProps {
  color?: Color
  blurOnSelect?: boolean
  onSelect?: (color: Color) => void
  onBlur?: FormChangeHandler
}

export const ColorPicker: VFC<ColorPickerProps> = ({
  color: currentColor = Color.Defualt,
  onSelect,
  onBlur,
  blurOnSelect = true
}) => {
  const formRef = useRef<HTMLFormElement>(null)
  const colorList = Object.values(Color)
  useEffect(() => formRef.current?.focus())

  const onChange: FormChangeHandler = event => {
    const color = (event.target as HTMLInputElement).value as Color
    onSelect?.(color)
    if (blurOnSelect)
      onBlur?.(event)
  }

  return <>
    <form 
      className="color-picker default"
      ref={formRef}
      onChange={onChange}
      onBlur={onBlur}
      tabIndex={0}
    >
      {colorList.map(color =>
        <label key={color} className={color}>
          <input type="radio" name="color" value={color} hidden />
          {currentColor === color
            ? <FontAwesomeIcon icon={faCheck} />
            : undefined
          }
        </label>
      )}
    </form>
  </>
}
