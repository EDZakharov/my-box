import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './Components/App'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { ErrorPage } from './Components/Error-page/Error-page'
import { RegisterPage } from './Components/Auth-page/Register-page/Register-page'
import { Preloader } from './Components/Preloader/Preloader'
import { Provider, useSelector } from 'react-redux'
import { store } from './redux/store'

const LoginPage = lazy(async () => ({
  default: (await import('./Components/Auth-page/Login-page/Login-page'))
    .LoginPage,
}))

const WithAppAuth = () => {
  const user = useSelector((state: any) => state.UserSlice)
  console.log('WithAppAuth', user)
  if (!user.login || !user.email || !user.password) {
    return (
      <Suspense fallback={<Preloader />}>
        <Navigate to="/login" />
      </Suspense>
    )
  } else {
    return <App />
  }
}

const WithLoginAuth = () => {
  const user = useSelector((state: any) => state.UserSlice)
  console.log('WithLoginAuth', user)
  if (!user.login || !user.email || !user.password) {
    return (
      <Suspense fallback={<Preloader />}>
        <LoginPage />
      </Suspense>
    )
  } else {
    return (
      <Suspense fallback={<Preloader />}>
        <Navigate to="/" />
      </Suspense>
    )
  }
}

const WithRegistrationAuth = () => {
  const user = useSelector((state: any) => state.UserSlice)
  console.log('WithRegistrationAuth', user)
  if (!user.login || !user.email || !user.password) {
    return (
      <Suspense fallback={<Preloader />}>
        <RegisterPage />
      </Suspense>
    )
  } else {
    return (
      <Suspense fallback={<Preloader />}>
        <Navigate to="/" />
      </Suspense>
    )
  }
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <WithAppAuth />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <WithLoginAuth />,
  },
  {
    path: '/registration',
    element: <WithRegistrationAuth />,
  },
])

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)

reportWebVitals()
