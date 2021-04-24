import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { VFC } from 'react'
import { useGoogleLogin } from 'react-google-login'
import { useDispatch } from 'react-redux'
import { googleClientId } from '../constants'
import { login } from '../store/thunks/user'
import { SettingsItem } from './SettingsItem'

export const LoginSettingsItem: VFC = () => {
  const dispatch = useDispatch()
  const { signIn } = useGoogleLogin({
    clientId: googleClientId,
    onSuccess: response => dispatch(login(response))
  })

  return <>
    <SettingsItem
      label="Login"
      icon={faGoogle}
      onClick={signIn}
    />
  </>
}