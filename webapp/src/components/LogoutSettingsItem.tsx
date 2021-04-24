import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { VFC } from 'react'
import { useGoogleLogout } from 'react-google-login'
import { useDispatch } from 'react-redux'
import { googleClientId } from '../constants'
import { logout } from '../store/thunks/user'
import { SettingsItem } from './SettingsItem'

export const LogoutSettingsItem: VFC = () => {
  const dispatch = useDispatch()
  const { signOut } = useGoogleLogout({
    clientId: googleClientId,
    onLogoutSuccess: () => dispatch(logout())
  })

  return <>
    <SettingsItem
      label="Logout"
      icon={faGoogle}
      onClick={signOut}
    />
  </>
}