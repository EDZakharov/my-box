import React from 'react'
import { useLoginMutation } from '../../../redux/Endpoints/User-endpoints'
import { StandardButton } from '../Standard-btn'
import style from './Login-btn.module.scss'

type props = {
  login?: string
  password?: string
}

export const LoginButton = ({ login, password }: props): JSX.Element => {
  const [setBody, { isError, error }] = useLoginMutation()
  const newError = JSON.stringify(error)
  const errorMessage = isError
    ? JSON.parse(newError).data.message.split(' ')[1]
    : ''
  return (
    <div className={style.login__button__wrapper}>
      <StandardButton
        onButtonClick={setBody}
        onButtonClickParams={
          login && password ? { login, password } : undefined
        }
        preventDefaulted={false}
        width={155}
        height={55}
        fontSize={20}
        tittle={'login'}
      />
      {isError &&
        (function () {
          return (
            <div className={style.error}>
              <div>Wrong {errorMessage}!</div>
            </div>
          )
        })()}
    </div>
  )
}
