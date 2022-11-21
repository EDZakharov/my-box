import React, { useEffect, useState } from 'react'
import style from './Login-page.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

export const LoginPage: React.FC = () => {
  const [inpValue1, setInpValue1] = useState<string>('')
  const [inpValue2, setInpValue2] = useState<string>('')
  const [on, off] = useState<boolean>(false)
  const [users, setUser] = useState({})

  const URL = 'http://localhost:7000/user/one'

  const regUser = async (login: string, password: string) => {
    const data = await fetch(URL, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({ login, password }),
    })
    return data
  }

  return (
    <div className={style.LoginPage__wrapper}>
      <div className={style.LoginPage}>
        <div className={style.LoginPage__header}>
          <span className={style.LoginPage__header__text}>My-BOX</span>
        </div>
        <form
          className={style.LoginPage__main}
          onSubmit={async (e) => {
            e.preventDefault()
          }}
        >
          <div className={style.LoginPage__main__wrapper__input}>
            <input
              type="text"
              className={style.LoginPage__main__input}
              placeholder="E-mail"
              // required={true}
              value={inpValue1}
              onChange={(e): void => {
                setInpValue1(e.target.value)
              }}
              style={
                inpValue1.length !== 0
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
              value={inpValue2}
              onChange={(e): void => {
                setInpValue2(e.target.value)
              }}
              style={
                inpValue2.length !== 0
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
          <div className={style.LoginPage__main__wrapper__button}>
            <button
              type="submit"
              className={style.LoginPage__main__button}
              onClick={() => {
                regUser(inpValue1, inpValue2).then((data) => {
                  console.log('Data: ', data)
                })
              }}
            >
              login
            </button>
          </div>
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
