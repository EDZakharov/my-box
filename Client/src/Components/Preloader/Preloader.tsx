import React from 'react'
import './Preloader.css'

export const Preloader: React.FC = () => {
  return (
    <div className="preloader">
      <div className="loader">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  )
}
