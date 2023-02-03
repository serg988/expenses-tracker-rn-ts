import { Alert } from 'react-native'
import AuthContent from '../../components/auth/AuthContent'
import LoadingOverlay from '../../components/ui/LoadingOverlay'
import { signup } from '../../store/authSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'

function SignupScreen() {
  const { loading } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  async function signupHandler({
    email,
    password,
    rememberCredentials,
  }: {
    email: string
    password: string
    rememberCredentials: boolean
  }) {
    try {
      dispatch(signup({ email, password, rememberCredentials }))
    } catch (error: any) {
      Alert.alert('Authentication failed!', error.message)
    }
  }

  if (loading) {
    return <LoadingOverlay message='Loading...' />
  }

  return <AuthContent isLogin={false} onAuthenticate={signupHandler} />
}

export default SignupScreen
