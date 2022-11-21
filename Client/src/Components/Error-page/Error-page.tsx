import React from 'react'
import { useRouteError, useLocation } from 'react-router-dom'
import style from './Error-page.module.scss'

export const ErrorPage: React.FC = () => {
  const error: unknown = useRouteError()
  const location = useLocation()
  console.error(error)

  return (
    <div className={style.ErrorPage}>
      <div className={style.ErrorPage__wrapper__text}>
        <h1>Error 404</h1>
        <p>Page {location.pathname}</p>
        <h2>not Found</h2>
      </div>
    </div>
  )
}
