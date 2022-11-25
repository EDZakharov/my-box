import React from 'react'
import { Link } from 'react-router-dom'
import style from './Standard-auth-page.module.scss'

type props = {
  linkTo?: string
}

const showLink = (link: string): JSX.Element => {
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
export const StandardAuthPage = ({ linkTo }: props): JSX.Element => {
  return (
    <div className={style.StandardAuthPage__wrapper}>
      <div className={style.StandardAuthPage}>
        <div className={style.StandardAuthPage__header}>
          <span className={style.StandardAuthPage__header__text}>My-BOX</span>
        </div>
        <div className={style.StandardAuthPage__main}>FORM</div>
        <div className={style.StandardAuthPage__footer}>
          <div className={style.StandardAuthPage__footer__text}>
            {linkTo && showLink(linkTo)}
          </div>
        </div>
        <div className={style.StandardAuthPage__inner__border__bottom}></div>
      </div>
    </div>
  )
}
