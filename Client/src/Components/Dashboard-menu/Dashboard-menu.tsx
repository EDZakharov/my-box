import React from 'react'
import style from './Dashboard-menu.module.scss'

export const DashboardMenu: React.FC = () => {
  return (
    <div className={style.dashboard__menu}>
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
      </ul>
    </div>
  )
}
