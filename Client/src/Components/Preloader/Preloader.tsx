import React from 'react'
import style from './Preloader.module.scss'

export const Preloader: React.FC = () => {
  return (
    <div className={style.Preloader}>
      <div className="loader">
        <span>Loading...</span>
      </div>
    </div>
  )
}
