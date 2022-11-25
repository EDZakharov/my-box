import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthQuery } from '../../../redux/Endpoints/Auth-endpoints'
import { StandardAuthPage } from '../Standard-auth-page'
// import style from './Register-page.module.scss'

export const RegisterPage: React.FC = () => {
  const { data }: any = useAuthQuery({})
  if (!data?.auth) {
    return <StandardAuthPage linkTo="login" />
  } else {
    return <Navigate to={'/'} />
  }
}
