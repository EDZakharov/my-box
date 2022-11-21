import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './Components/App'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { ErrorPage } from './Components/Error-page/Error-page'
import { RegisterPage } from './Components/Auth-page/Register-page/Register-page'
import { Preloader } from './Components/Preloader/Preloader'
import { checkAuth } from './Auth/CheckAuth'

const LoginPage = lazy(async () => ({
  default: (await import('./Components/Auth-page/Login-page/Login-page'))
    .LoginPage,
}))

const router = createBrowserRouter([
  {
    path: '/',
    element: checkAuth() ? (
      <App />
    ) : (
      <Suspense fallback={<Preloader />}>
        <Navigate to="/login" />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: checkAuth() ? (
      <Suspense fallback={<Preloader />}>
        <Navigate to="/" />
      </Suspense>
    ) : (
      <Suspense fallback={<Preloader />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: '/registration',
    element: checkAuth() ? (
      <Suspense fallback={<Preloader />}>
        <Navigate to="/" />
      </Suspense>
    ) : (
      <RegisterPage />
    ),
  },
])

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(<RouterProvider router={router} />)

reportWebVitals()
