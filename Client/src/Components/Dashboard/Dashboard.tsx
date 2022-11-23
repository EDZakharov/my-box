import React from 'react'
import { useAuthQuery } from '../../redux/Endpoints/Auth-endpoints'
// import style from './fileName.module.scss'

export const Dashboard: React.FC = () => {
  const { ...rest } = useAuthQuery({})

  return <div>123</div>
}
