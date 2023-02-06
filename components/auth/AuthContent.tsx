import { useState } from 'react'
import { Alert, StyleSheet, View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import FlatButton from '../ui/FlatButton'
import AuthForm from './AuthForm'
import { COLORS } from '../../constants/styles'
import { CredentialsSignup, CredentialsLogin } from '../../types'
import useTheme from '../../hooks/useTheme'

interface Props {
  isLogin: boolean
  onAuthenticate: ({
    email,
    password,
    rememberCredentials,
  }: {
    email: string
    password: string
    rememberCredentials: boolean
  }) => void
}

function AuthContent({ isLogin, onAuthenticate }: Props) {
  const themeId = useTheme()
  const navigation = useNavigation<any>()

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
  })

  function switchAuthModeHandler() {
    if (isLogin) {
      navigation.replace('Signup')
    } else {
      navigation.replace('Login')
    }
  }

  function submitHandler(credentials: CredentialsSignup) {
    let {
      email,
      confirmEmail,
      password,
      confirmPassword,
      rememberCredentials,
    } = credentials

    email = email.trim()
    password = password.trim()

    const emailIsValid = email.includes('@')
    const passwordIsValid = password.length > 6
    const emailsAreEqual = email === confirmEmail
    const passwordsAreEqual = password === confirmPassword

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
    ) {
      Alert.alert('Invalid input', 'Please check your entered credentials.')
      setCredentialsInvalid({
        email: !emailIsValid,
        confirmEmail: !emailIsValid || !emailsAreEqual,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      })
      return
    }
    onAuthenticate({ email, password, rememberCredentials })
  }

  const styles = StyleSheet.create({
    authContent: {
      marginTop: 64,
      marginHorizontal: 32,
      padding: 16,
      borderRadius: 8,
      backgroundColor: COLORS(themeId).primary800,
      elevation: 2,
      shadowColor: 'black',
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.35,
      shadowRadius: 4,
    },
    buttons: {
      marginTop: 8,
    },
  })

  return (
    <View style={styles.authContent}>
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
      <View style={styles.buttons}>
        <FlatButton onPress={switchAuthModeHandler}>
          {isLogin ? 'Зарегистрироваться' : 'Войти'}
        </FlatButton>
      </View>
      {/* <Text>KJHKjhkjh</Text> */}
    </View>
  )
}

export default AuthContent
