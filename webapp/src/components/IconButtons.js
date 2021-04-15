import "../styles/IconButton.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as solid from '@fortawesome/free-solid-svg-icons'

export const Icon = props => {
  const { icon, className } = props
  props = {...props}
  delete props.icon

  return <>
    <button {...props} className={"icon-button " + (className ?? "")}>
      <FontAwesomeIcon icon={icon}/>
    </button>
  </>
}

const createIconButton = icon => props =>
  <Icon {...props} icon={icon}/>

export const Accept = createIconButton(solid.faCheck)
export const Cancel = createIconButton(solid.faTimes)
export const Edit = createIconButton(solid.faPen)
export const Delete = createIconButton(solid.faTrashAlt)
export const ColorPicker = createIconButton(solid.faPalette)
export const LightTheme = createIconButton(solid.faSun)
export const DarkTheme = createIconButton(solid.faMoon)
