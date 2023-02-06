import { useEffect } from 'react'
import { Alert} from 'react-native'
import AuthContent from '../../components/auth/AuthContent'
import LoadingOverlay from '../../components/ui/LoadingOverlay'
import { login, loginStored } from '../../store/authSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { getAsyncStorageData } from '../../util/auth'

function LoginScreen() {
  useEffect(() => {
    const fn = async () => {
      const data = await getAsyncStorageData(['email', 'password'])
      if (data) {
        const email = data[0][1]
        const password = data[1][1]
        if(email && password)
        dispatch(loginStored({email, password}))
      }
    }
    fn()
  }, [])

  const { loading } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  function signinHandler({
    email,
    password,
    rememberCredentials,
  }: {
    email: string
    password: string
    rememberCredentials: boolean
  }) {
    try {
      dispatch(login({ email, password, rememberCredentials }))
    } catch (error: any) {
      Alert.alert('Вход не удался!', error.message)
    }
  }

  if (loading) {
    return <LoadingOverlay message='Пытаюсь войти...' />
  }

  return <AuthContent isLogin onAuthenticate={signinHandler} />
}

export default LoginScreen
