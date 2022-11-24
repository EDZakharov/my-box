import React from 'react'
import { useAuthQuery } from '../../redux/Endpoints/Auth-endpoints'
import { useLogoutMutation } from '../../redux/Endpoints/User-endpoints'
import { DashboardMenu } from '../Dashboard-menu/Dashboard-menu'
import style from './App.module.scss'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/toolkit'
import { Link } from 'react-router-dom'

export const App: React.FC = () => {
  const { ...rest } = useAuthQuery({})
  const [setLogout] = useLogoutMutation()
  const dispatch = useDispatch()
  const logoutApp = () => {
    setLogout({})
    dispatch(logout())
  }

  return (
    <div className={style.app__wrapper}>
      <div className={style.app__header}>
        header<button onClick={logoutApp}>logout</button>
      </div>
      {/* <DashboardMenu /> */}
      <div className={style.app__main}>
        <h1>main</h1>
        <Link to={'/Client'}>Client</Link>
      </div>
      <div className={style.app__footer}>footer</div>
    </div>
  )
}
