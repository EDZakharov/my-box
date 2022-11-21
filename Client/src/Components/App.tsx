import React from 'react'
import style from './App.module.scss'

export const App: React.FC = () => {
  return (
    <div className={style.app__wrapper}>
      <div className={style.app}>
        <header className={style.app__header}>
          <h1>Welcome to My-BOX</h1>
        </header>
        <main className={style.app__main}>main</main>
        <footer className={style.app__footer}>footer</footer>
      </div>
    </div>
  )
}
