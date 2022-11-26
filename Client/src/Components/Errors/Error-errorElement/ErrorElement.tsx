import { useRouteError, useLocation, Link } from 'react-router-dom'
import style from './ErrorElement.module.scss'

export const ErrorElement = (): JSX.Element => {
  const error: unknown = useRouteError()
  const location = useLocation()
  console.error(error)

  return (
    <div className={style.ErrorPage}>
      <div className={style.ErrorPage__wrapper__text}>
        <h1>Error 404</h1>
        <p>Page {location.pathname}</p>
        <h2>not Found</h2>
        <Link to={'/'}>Return</Link>
      </div>
    </div>
  )
}
