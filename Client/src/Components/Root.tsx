import React from 'react'
import { Outlet } from 'react-router-dom'
import { LoginPage } from './Auth-page/Login-page/Login-page'
import style from './Root.module.scss'
import { useSelector } from 'react-redux'

export const Root: React.FC = () => {
  const data = useSelector((state: any) => state.UserSlice.accessToken)

  if (data) {
    return (
      <div className={style.root__wrapper}>
        <Outlet />
      </div>
    )
  } else {
    return <LoginPage />
  }
}
