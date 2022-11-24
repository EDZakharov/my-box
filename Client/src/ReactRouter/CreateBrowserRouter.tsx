import { createBrowserRouter, Link } from 'react-router-dom'
import { Root } from '../Components/Root'
import { RegisterPage } from '../Components/Auth-page/Register-page/Register-page'
import { ErrorPage } from '../Components/Error-page/Error-page'
import { App } from '../Components/App/App'
import { LogoutButton } from '../Components/Buttons/Logout/Logout-btn'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    // loader: Auth,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/client',
        element: (
          <div>
            <Link to={'/'}>Back</Link>
            <LogoutButton />
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
