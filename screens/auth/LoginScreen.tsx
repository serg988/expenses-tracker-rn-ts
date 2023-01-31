import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect } from 'react'
import { Alert, Text, View } from 'react-native'
import AuthContent from '../../components/auth/AuthContent'
import LoadingOverlay from '../../components/ui/LoadingOverlay'
import { authenticate, login } from '../../store/authSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { getAsyncStorageData } from '../../util/auth'

function LoginScreen() {
  

  useEffect(() => {
    const fn = async () => {
      const data = await getAsyncStorageData(['email', 'password'])
      if (data) {
        const email = data[0][1]
        const password = data[0][1]
        if (email && password) dispatch(login({ email, password }))
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
      Alert.alert('Authentication failed!', error.message)
    }
  }

  if (loading) {
    return <LoadingOverlay message='Logging in...' />
  }

  return <AuthContent isLogin onAuthenticate={signinHandler} />
}

export default LoginScreen
