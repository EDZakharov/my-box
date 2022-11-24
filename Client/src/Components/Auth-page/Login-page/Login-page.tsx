import React, { useState } from 'react'
import style from './Login-page.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { LoginButton } from '../../Buttons/Login/Login-btn'

export const LoginPage: React.FC = () => {
  const [login, setLogin] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [on, off] = useState<boolean>(false)

  return (
    <div className={style.LoginPage__wrapper}>
      <div className={style.LoginPage}>
        <div className={style.LoginPage__header}>
          <span className={style.LoginPage__header__text}>My-BOX</span>
        </div>
        <form
          className={style.LoginPage__main}
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          <div className={style.LoginPage__main__wrapper__input}>
            <input
              type="text"
              className={style.LoginPage__main__input}
              placeholder="Login"
              // required={true}
              value={login}
              onChange={(e): void => {
                setLogin(e.target.value)
              }}
              style={
                login.length !== 0
                  ? { borderBottom: '1px solid #08c' }
                  : { borderBottom: '1px solid rgba(150, 150, 150, 0.438)' }
              }
            />
          </div>
          <div className={style.LoginPage__main__wrapper__input}>
            <input
              type={!on ? 'password' : 'text'}
              className={style.LoginPage__main__input}
              placeholder="Password"
              value={password}
              onChange={(e): void => {
                setPassword(e.target.value)
              }}
              style={
                password.length !== 0
                  ? { borderBottom: '1px solid #08c' }
                  : { borderBottom: '1px solid rgba(150, 150, 150, 0.438)' }
              }
            />
            <FontAwesomeIcon
              icon={on ? faEye : faEyeSlash}
              className={style.LoginPage__main__input__icon}
              onClick={(): void => {
                off(!on)
              }}
            />
          </div>
          <div className={style.LoginPage__main__wrapper__remember}>
            <label>
              <input
                type="checkbox"
                className={style.LoginPage__main__remember__input}
              />{' '}
              Remember me
            </label>
            <Link to="#" className={style.LoginPage__main__remember__link}>
              Forgot password?
            </Link>
          </div>
          <LoginButton login={login} password={password} />
        </form>
        <div className={style.LoginPage__footer}>
          <div className={style.LoginPage__footer__register}>
            <span>Don't have an account?</span>
            <Link to="/registration">Register here</Link>
          </div>
        </div>
        <div className={style.LoginPage__inner__border__bottom}></div>
      </div>
    </div>
  )
}
