import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthQuery } from '../../../redux/Endpoints/Auth-endpoints'
import style from './Register-page.module.scss'

export const RegisterPage: React.FC = () => {
  const { data }: any = useAuthQuery({})
  if (!data?.auth) {
    return <div className={style.RegisterPage}>registration</div>
  } else {
    return <Navigate to={'/'} />
  }
}
