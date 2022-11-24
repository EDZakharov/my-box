import { useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { useAuthQuery } from '../redux/Endpoints/Auth-endpoints'
import { setAccessToken } from '../redux/toolkit'
import { LoginPage } from './Auth-page/Login-page/Login-page'

export const Root = (): JSX.Element => {
  const stateToken = useSelector((state: any) => state.UserSlice.accessToken)
  const auth = useSelector((state: any) => state.UserSlice.auth)
  const localToken = localStorage.getItem('accessToken')
  const dispatch = useDispatch()

  useLayoutEffect(() => {
    if (!stateToken && localToken) {
      dispatch(setAccessToken(localToken))
    }
  }, [auth, dispatch, localToken, stateToken])

  if (auth) {
    return <AuthOutlet />
  } else {
    return <LoginPage />
  }
}

const AuthOutlet = () => {
  useAuthQuery({})
  return <Outlet />
}
