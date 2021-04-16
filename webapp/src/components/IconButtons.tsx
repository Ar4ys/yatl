import type { DetailedHTMLProps, HTMLAttributes, VFC } from "react"
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import * as solid from '@fortawesome/free-solid-svg-icons'
import "../styles/IconButton.css"

type HTMLButtonProps =
  DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export type FontAwesomeIconProp = FontAwesomeIconProps['icon']

export interface IconProps extends HTMLButtonProps {
  icon: FontAwesomeIconProp
}

export const Icon: VFC<IconProps> = props => {
  const { icon, className } = props

  return <>
    <button {...props} className={"icon-button " + (className ?? "")}>
      <FontAwesomeIcon icon={icon}/>
    </button>
  </>
}

type IconButtonFabric =
  (icon: FontAwesomeIconProp) => VFC<Omit<IconProps, 'icon'>>

const createIconButton: IconButtonFabric = icon => props =>
  <Icon {...props} icon={icon}/>

export const Accept = createIconButton(solid.faCheck)
export const Cancel = createIconButton(solid.faTimes)
export const Edit = createIconButton(solid.faPen)
export const Delete = createIconButton(solid.faTrashAlt)
export const ColorPicker = createIconButton(solid.faPalette)
export const LightTheme = createIconButton(solid.faSun)
export const DarkTheme = createIconButton(solid.faMoon)
