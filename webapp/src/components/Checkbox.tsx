import { ChangeEventHandler, useState, VFC } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircle, faCheckCircle } from "@fortawesome/free-regular-svg-icons"
import "../styles/Checkbox.css"

export interface CheckboxProps {
  name?: string
  checked?: boolean
  onChange?: ChangeEventHandler<HTMLInputElement>
}

export const Checkbox: VFC<CheckboxProps> = ({ name, checked, onChange }) => {
  const [ isChecked, setChecked ] = useState(checked)

  const toggle: ChangeEventHandler<HTMLInputElement> = event => {
    const { checked } = event.target
    setChecked(checked)
    onChange?.(event)
  }

  const Checked = () => <FontAwesomeIcon icon={faCheckCircle}/>
  const Unchecked = () => <FontAwesomeIcon icon={faCircle}/>

  return <>
    <label className="checkbox">
      <input
        type="checkbox"
        name={name}
        checked={isChecked}
        onChange={toggle}
        hidden
      />
      {isChecked ? <Checked /> : <Unchecked />}
    </label>
  </>
}
