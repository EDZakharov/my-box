import { useDispatch } from 'react-redux'
import { useLogoutMutation } from '../../../redux/Endpoints/User-endpoints'
import { logout } from '../../../redux/toolkit'
import { StandardButton } from '../Standard-btn'

export const LogoutButton = (): JSX.Element => {
  const [setLogout] = useLogoutMutation()
  const dispatch = useDispatch()
  const logoutApp = () => {
    setLogout({})
    dispatch(logout())
  }

  return (
    <StandardButton
      onButtonClick={logoutApp}
      width={115}
      height={40}
      fontSize={16}
      tittle={'Logout'}
      preventDefaulted={false}
    />
  )
}
