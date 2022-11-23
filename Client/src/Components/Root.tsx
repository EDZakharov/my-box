import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { setAccessToken } from '../redux/toolkit'
import { LoginPage } from './Auth-page/Login-page/Login-page'
// import { Auth } from '../Auth/Auth'

export const Root: React.FC = () => {
  const stateToken = useSelector((state: any) => state.UserSlice.accessToken)
  const auth = useSelector((state: any) => state.UserSlice.auth)
  const localToken = localStorage.getItem('accessToken')
  const dispatch = useDispatch()

  useEffect(() => {
    if (!stateToken && localToken) {
      dispatch(setAccessToken(localToken))
    }
  }, [auth, dispatch, localToken, stateToken])

  if (auth) {
    return <Outlet />
  } else {
    return <LoginPage />
  }
}
