import style from './Error-btn.module.scss'

type props = {
  errorMessage: string
}

/** This is a React function component.
 */
export const ErrorButton = ({ errorMessage }: props): JSX.Element => {
  return (
    <div className={style.error__wrapper}>
      <div className={style.error}>
        <span>{errorMessage}</span>
      </div>
    </div>
  )
}
