import style from './App.module.scss'
import { Link } from 'react-router-dom'
import { Footer } from '../Footer/Footer'
import { LogoutButton } from '../Buttons/Logout/Logout-btn'

export const App = (): JSX.Element => {
  return (
    <div className={style.app__wrapper}>
      <div className={style.app__header}>
        header
        <LogoutButton />
      </div>
      {/* <DashboardMenu /> */}
      <div className={style.app__main}>
        <h1>main</h1>

        <Link to={'/client'}>Client</Link>
      </div>
      <Footer />
    </div>
  )
}
