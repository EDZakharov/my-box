import React from 'react'

import { useSelector } from 'react-redux'
import { redirect } from 'react-router-dom'
import { Root } from '../Components/Root'

export const Auth = () => {
  const data = useSelector((state: any) => state.UserSlice.accessToken)
  if (!data) {
    return redirect('/login')
  } else {
    return <>data</>
  }
}
