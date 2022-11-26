import { useLoginMutation } from '../../../redux/Endpoints/User-endpoints'
import { ErrorButton } from '../../Errors/Error-button/Error-btn'
import { StandardButton } from '../Standard-btn'
import style from './Login-btn.module.scss'
import { useDispatch } from 'react-redux'
import { pending } from '../../../redux/toolkit'

type props = {
  login: string
  password: string
}

export const LoginButton = ({ login, password }: props): JSX.Element => {
  const [setBody, { isError, error, status }] = useLoginMutation()
  const dispatch = useDispatch()
  if (status === 'pending') {
    dispatch(pending(true))
  }
  const newError = JSON.stringify(error)
  const errorMessage = isError
    ? JSON.parse(newError).data.message.split(' ')[1]
    : ''

  const getMessage = () => {
    if (login.length === 0 && password.length === 0) {
      return 'Empty login and password'
    }
    if (login.length === 0) {
      return 'Empty login'
    }
    if (password.length === 0) {
      return 'Empty password'
    }
    return `Wrong ${errorMessage}!`
  }

  return (
    <div className={style.login__button__wrapper}>
      <StandardButton
        onButtonClick={setBody}
        onButtonClickParams={{ login, password }}
        preventDefaulted={false}
        width={145}
        height={55}
        fontSize={18}
        tittle={'login'}
      />
      {isError && <ErrorButton errorMessage={`${getMessage()}`} />}
    </div>
  )
}
