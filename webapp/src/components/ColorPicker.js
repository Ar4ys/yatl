import { useRef, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import "../styles/ColorPicker.css"

export function ColorPicker({
  onSelect,
  onBlur,
  colors,
  color: currentColor,
  blurOnSelect
}) {
  const formRef = useRef(null)
  useEffect(() => formRef.current.focus())

  const onChange = event => {
    onSelect?.(event.target.value)
    if (blurOnSelect)
      onBlur?.(event)
  }

  return <>
    <form 
      className="color-picker default"
      ref={formRef}
      onChange={onChange}
      onBlur={onBlur}
      tabIndex="0"
    >
      {colors.map(color =>
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
