import { StandardForm } from '../Standard-form/Standard-form'

/** This is a React function component.
 */
export const RegisterForm = (): JSX.Element => {
  return (
    <StandardForm
      inputsNames={['Email', 'Login', 'Password']}
      formName={'Registration'}
    />
  )
}
