import React from 'react'
import { useAuthQuery } from '../../redux/Endpoints/Auth-endpoints'
import { DashboardMenu } from '../Dashboard-menu/Dashboard-menu'
import style from './App.module.scss'

export const App: React.FC = () => {
  const { ...rest } = useAuthQuery({})

  return (
    <div className={style.app__wrapper}>
      <DashboardMenu />
    </div>
  )
}
