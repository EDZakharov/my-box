import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LoginButton } from '../../../Buttons/Login/Login-btn'
import { RegistrationButton } from '../../../Buttons/Registration/Registration-btn'
import { StandardFormInput } from './Standard-form-input'
import style from './Standard-form.module.scss'

type props = {
  inputsNames: string[] | undefined
  formName?: string
}

type initialState = {
  dataEntries: { [key: string]: string }
}

/** This is a React function component.
 * @param {string | undefined} formName - if 'Login' show LoginButton
 */
export const StandardForm = ({ inputsNames, formName }: props): JSX.Element => {
  let initialState: initialState = {
    dataEntries: {},
  }
  inputsNames?.forEach((el) => (initialState.dataEntries[el] = ''))
  const [value, setValue] = useState(initialState)

  const interceptor = (e: { target: { name: any; value: any } }) => {
    setValue({
      dataEntries: {
        ...value.dataEntries,
        [e.target.name]: e.target.value,
      },
    })
  }

  return (
    <form
      className={style.standardForm}
      onSubmit={(e) => {
        e.preventDefault()
      }}
    >
      {inputsNames?.map((el) => {
        return (
          <StandardFormInput
            key={el}
            name={el}
            value={value.dataEntries[el]}
            setValue={interceptor}
          />
        )
      })}
      {formName === 'Login' && (
        <div className={style.standardForm__wrapper__remember}>
          <label>
            <input
              type="checkbox"
              className={style.standardForm__remember__input}
            />{' '}
            Remember me
          </label>
          <Link to="#" className={style.standardForm__remember__link}>
            Forgot password?
          </Link>
        </div>
      )}
      {formName === 'Login' && inputsNames?.includes('Login' || 'Password') ? (
        <LoginButton
          login={value.dataEntries.Login}
          password={value.dataEntries.Password}
        />
      ) : (
        <></>
      )}
      {formName === 'Registration' &&
      inputsNames?.includes('Email' || 'Login' || 'Password') ? (
        <RegistrationButton
          email={value.dataEntries.Email}
          login={value.dataEntries.Login}
          password={value.dataEntries.Password}
        />
      ) : (
        <></>
      )}
    </form>
  )
}

export function typedReactMemoFC<C extends React.FC>(component: C): C {
  return React.memo(component) as unknown as C
}
