import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import style from './Standard-form-input.module.scss'

type status = {
  status: boolean
  setStatus: any
}

type formInput = {
  name: string
  value: string
  setValue: any
}

export const StandardFormInput = (props: formInput) => {
  const [status, setStatus] = useState(false)
  return (
    <div className={style.standardForm__wrapper__input}>
      <CustomInput
        name={props.name}
        status={status}
        value={props.value}
        setValue={props.setValue}
      />
      {props.name === 'Password' && (
        <CustomEyeFontAwesomeIcon status={status} setStatus={setStatus} />
      )}
    </div>
  )
}

const CustomEyeFontAwesomeIcon = ({ status, setStatus }: status) => {
  return (
    <FontAwesomeIcon
      icon={status ? faEye : faEyeSlash}
      className={style.standardForm__input__icon}
      onClick={(): void => {
        setStatus(!status)
      }}
    />
  )
}

const CustomInput = ({ name, status, value, setValue }: any) => {
  return (
    <input
      type={
        name === 'Login'
          ? 'text'
          : name === 'Password'
          ? !status
            ? 'password'
            : 'text'
          : 'text'
      }
      className={style.standardForm__input}
      placeholder={name}
      value={value}
      name={name}
      onChange={(e) => {
        setValue(e)
      }}
      style={
        value?.length !== 0
          ? { borderBottom: '1px solid #08c' }
          : { borderBottom: '1px solid rgba(150, 150, 150, 0.438)' }
      }
    />
  )
}
