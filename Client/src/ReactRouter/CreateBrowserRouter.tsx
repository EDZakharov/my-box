import { createBrowserRouter, Link } from 'react-router-dom'
import { Auth } from '../Auth/Auth'
import { Root } from '../Components/Root'
import { LoginPage } from '../Components/Auth-page/Login-page/Login-page'
import { RegisterPage } from '../Components/Auth-page/Register-page/Register-page'
import { ErrorPage } from '../Components/Error-page/Error-page'
import { Preloader } from '../Components/Preloader/Preloader'
import { Suspense } from 'react'
import { App } from '../Components/App/App'

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<Preloader />}>
        <Root />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<Preloader />}>
        <ErrorPage />
      </Suspense>
    ),
    // loader: Auth,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/Client',
        element: (
          <div>
            <Link to={'/'}>Back</Link>
          </div>
        ),
      },
    ],
  },
  {
    path: 'registration',
    element: <RegisterPage />,
  },
])
