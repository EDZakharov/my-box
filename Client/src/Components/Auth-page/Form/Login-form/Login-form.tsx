import { StandardForm } from '../Standard-form/Standard-form'

/** This is a React function component.
 */
export const LoginForm = (): JSX.Element => {
  return <StandardForm inputsNames={['Login', 'Password']} formName={'Login'} />
}
