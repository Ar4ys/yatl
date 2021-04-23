import { VFC, MouseEventHandler } from "react"
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import "../styles/SettingsItem.css"

export interface SettingsItemProps {
  label: string
  icon: FontAwesomeIconProps['icon']
  onClick?: MouseEventHandler<HTMLDivElement>
}

export const SettingsItem: VFC<SettingsItemProps> =
  ({ label, onClick, icon }) => {
    return <>
      <div className="settings-item" onClick={onClick}>
        <FontAwesomeIcon icon={icon} />
        <p>{label}</p>
      </div>
    </>
  }
