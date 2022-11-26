import { Link } from 'react-router-dom'
import style from './Standard-auth-page.module.scss'

type props = {
  linkTo?: string
  formElement: JSX.Element
}

type link = {
  link?: string
}

const CustomLink = ({ link }: link): JSX.Element => {
  if (link === 'login') {
    return (
      <>
        <span>Have an account?</span>
        <Link to={`/`}>Login here</Link>
      </>
    )
  }
  if (link === 'registration') {
    return (
      <>
        <span>Don't have an account?</span>
        <Link to={`/${link}`}>Register here</Link>
      </>
    )
  }
  return <></>
}

/** This is a React function component.
 */
export const StandardAuthPage = ({
  linkTo,
  formElement,
}: props): JSX.Element => {
  return (
    <div className={style.StandardAuthPage__wrapper}>
      <div className={style.StandardAuthPage}>
        <div className={style.StandardAuthPage__header}>
          <span className={style.StandardAuthPage__header__text}>My-BOX</span>
        </div>
        {formElement}
        <div className={style.StandardAuthPage__footer}>
          <div className={style.StandardAuthPage__footer__text}>
            {linkTo && <CustomLink link={linkTo} />}
          </div>
        </div>
        <div className={style.StandardAuthPage__inner__border__bottom}></div>
      </div>
    </div>
  )
}
