import { createBrowserRouter } from 'react-router-dom'
import { Root } from '../Components/Root'
import { RegisterPage } from '../Components/Auth-page/Register-page/Register-page'
import { ErrorPage } from '../Components/Error-page/Error-page'
import { Preloader } from '../Components/Preloader/Preloader'
import { Suspense } from 'react'
import { Dashboard } from '../Components/Dashboard/Dashboard'

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
        element: <Dashboard />,
      },
    ],
  },
  {
    path: 'registration',
    element: <RegisterPage />,
  },
])
