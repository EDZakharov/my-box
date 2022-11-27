import { useLoginMutation } from '../../../redux/Endpoints/User-endpoints'
import { ErrorButton } from '../../Errors/Error-button/Error-btn'
import { StandardButton } from '../Standard-btn'
import style from './Login-btn.module.scss'
import { useState } from 'react'

type props = {
  login: string
  password: string
}

export const LoginButton = ({
  login = '',
  password = '',
}: props): JSX.Element => {
  const [setBody, { isError, error }] = useLoginMutation()
  const [errorStatus, setErrorStatus] = useState(false)

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

  const setBodyInterceptor = (args: any) => {
    if (login.length === 0 || password.length === 0) {
      setErrorStatus(true)
      setTimeout(() => {
        setErrorStatus(false)
      }, 1500)
    } else {
      setBody(args)
    }
  }

  return (
    <div className={style.login__button__wrapper}>
      <StandardButton
        onButtonClick={setBodyInterceptor}
        onButtonClickParams={{ login, password }}
        preventDefaulted={true}
        width={145}
        height={55}
        fontSize={18}
        tittle={'login'}
      />
      {isError || errorStatus ? (
        <ErrorButton errorMessage={`${getMessage()}`} />
      ) : (
        <></>
      )}
    </div>
  )
}
