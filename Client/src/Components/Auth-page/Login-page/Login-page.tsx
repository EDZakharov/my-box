import { LoginForm } from '../Form/Login-form/Login-form'
import { StandardAuthPage } from '../Standard-auth-page/Standard-auth-page'
import { useSelector } from 'react-redux'
import { Preloader } from '../../Preloader/Preloader'

export const LoginPage = (): JSX.Element => {
  const pending = useSelector((state: any) => state.UserSlice.pending)

  if (pending) {
    return <Preloader />
  } else {
    return (
      <StandardAuthPage linkTo="registration" formElement={<LoginForm />} />
    )
  }
}
