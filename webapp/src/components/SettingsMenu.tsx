import { FC, MouseEventHandler, useEffect, useRef } from "react"
import "../styles/SettingsMenu.css"

export interface SettingsMenuProps {
  onClose?: () => void
}

export const SettingsMenu: FC<SettingsMenuProps> =
  ({ children, onClose }) => {
    const divRef = useRef<HTMLDivElement>(null)
    useEffect(() => divRef.current?.focus())

    const closeOnChildClick: MouseEventHandler<HTMLDivElement> =
      (event) => event.target !== divRef.current && onClose?.()

    return <>
      <div
        ref={divRef}
        className="settings-menu"
        onBlur={onClose}
        onClick={closeOnChildClick}
        tabIndex={0}
      >
        {children}
      </div>
    </>
  }
