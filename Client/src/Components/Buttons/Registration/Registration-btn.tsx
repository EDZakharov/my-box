import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useRegistrationMutation } from '../../../redux/Endpoints/User-endpoints'
import { ErrorButton } from '../../Errors/Error-button/Error-btn'
import { StandardButton } from '../Standard-btn'
import style from './Registration-btn.module.scss'

type props = {
  email: string
  login: string
  password: string
}

export const RegistrationButton = ({
  email = '',
  login = '',
  password = '',
}: props): JSX.Element => {
  const [setBody, { isError, error, data }] = useRegistrationMutation()
  const [errorStatus, setErrorStatus] = useState(false)
  const resError = isError ? JSON.stringify(error) : ''

  const errorMessage = isError ? JSON.parse(resError).data?.message : ''
  const getMessage = (): any => {
    if (email.length === 0) {
      return 'Empty email!'
    }
    if (login.length === 0) {
      return 'Empty login!'
    }

    if (password.length === 0) {
      return 'Empty password!'
    }

    if (login.length === 0 && password.length === 0 && email.length === 0) {
      return 'Empty email, login and password'
    }
    if (login.length !== 0 && password.length !== 0 && email.length === 0) {
      return 'Empty email!'
    }
    if (login.length === 0 && password.length === 0 && email.length !== 0) {
      return 'Empty login!'
    }
    if (login.length !== 0 && password.length === 0 && email.length !== 0) {
      return 'Empty password!'
    }
    if (errorMessage) return `${errorMessage}!`
  }

  const setBodyInterceptor = (args: any) => {
    if (login.length === 0 || password.length === 0 || email.length === 0) {
      setErrorStatus(true)
      setTimeout(() => {
        setErrorStatus(false)
      }, 1500)
    } else {
      setBody(args)
    }
  }
  if (!data) {
    return (
      <div className={style.registration__button__wrapper}>
        <StandardButton
          onButtonClick={setBodyInterceptor}
          onButtonClickParams={{ email, login, password }}
          preventDefaulted={true}
          width={185}
          height={55}
          fontSize={18}
          tittle={'registration'}
        />
        {isError || errorStatus ? (
          <ErrorButton errorMessage={`${getMessage()}`} />
        ) : (
          <></>
        )}
      </div>
    )
  } else {
    return <Navigate to="/" />
  }
}
