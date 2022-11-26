import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { useAuthQuery } from '../../../redux/Endpoints/Auth-endpoints'
import { Preloader } from '../../Preloader/Preloader'
import { RegisterForm } from '../Form/Registration-form/Registration-form'
import { StandardAuthPage } from '../Standard-auth-page/Standard-auth-page'

export const RegisterPage: React.FC = () => {
  const pending = useSelector((state: any) => state.UserSlice.pending)
  const { data }: any = useAuthQuery({})

  if (pending) {
    return <Preloader />
  } else {
    if (!data?.auth) {
      return <StandardAuthPage linkTo="login" formElement={<RegisterForm />} />
    } else {
      return <Navigate to={'/'} />
    }
  }
}
