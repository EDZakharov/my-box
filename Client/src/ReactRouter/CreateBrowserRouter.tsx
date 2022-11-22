import { createBrowserRouter, Link } from 'react-router-dom'
import { Auth } from '../Auth/Auth'
import { Root } from '../Components/Root'
import { LoginPage } from '../Components/Auth-page/Login-page/Login-page'
import { RegisterPage } from '../Components/Auth-page/Register-page/Register-page'
import { ErrorPage } from '../Components/Error-page/Error-page'
import { Preloader } from '../Components/Preloader/Preloader'
import { Suspense } from 'react'

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
    loader: Auth.root,
    children: [
      {
        path: '/',
        element: (
          <Link
            to={'/client'}
            style={{
              // textDecoration: 'none',
              color: 'white',
            }}
          >
            <h1>Welcome</h1>
          </Link>
        ),
      },
    ],
  },
  {
    path: 'registration',
    element: <RegisterPage />,
  },
])
