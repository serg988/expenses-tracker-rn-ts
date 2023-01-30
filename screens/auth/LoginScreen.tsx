import { Alert, Text, View } from 'react-native'
import AuthContent from '../../components/auth/AuthContent'
import LoadingOverlay from '../../components/ui/LoadingOverlay'
import { login } from '../../store/authSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'

function LoginScreen() {
  const { loading } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  function signinHandler({
    email,
    password,
  }: {
    email: string
    password: string
    }) {
    try {
      dispatch(login({ email, password }))
    } catch (error: any) {
      Alert.alert('Authentication failed!', error.message)
    }
  }

  if (loading) {
    return <LoadingOverlay message='Logging in...' />
  }

  return <AuthContent isLogin onAuthenticate={signinHandler} />
}

export default LoginScreen
