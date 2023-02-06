import { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'

import { COLORS } from '../../constants/styles'

import BouncyCheckbox from 'react-native-bouncy-checkbox'

import Button from '../ui/Button'
import Input from './Input'

import type { CredentialsSignup } from '../../types'
import { useAppDispatch, useAppSelector } from '../../store/hooks'

import AsyncStorage from '@react-native-async-storage/async-storage'
import useTheme from '../../hooks/useTheme'

interface Props {
  isLogin: boolean
  onSubmit: ({}: CredentialsSignup) => void
  credentialsInvalid: {
    email: boolean
    confirmEmail: boolean
    password: boolean
    confirmPassword: boolean
  }
}

type InputType = 'email' | 'confirmEmail' | 'password' | 'confirmPassword'

function AuthForm({ isLogin, onSubmit, credentialsInvalid }: Props) {
  const [enteredEmail, setEnteredEmail] = useState('')
  const [enteredConfirmEmail, setEnteredConfirmEmail] = useState('')
  const [enteredPassword, setEnteredPassword] = useState('')
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('')
  const [rem, setRem] = useState(true)
  const themeId = useTheme()

  // const remember = useAppSelector((state) => state.auth.remember)
  const remember = async () => await AsyncStorage.getItem('remember')

  const dispatch = useAppDispatch()

  const {
    email: emailIsInvalid,
    confirmEmail: emailsDontMatch,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = credentialsInvalid

  function updateInputValueHandler(inputType: InputType, enteredValue: string) {
    switch (inputType) {
      case 'email':
        setEnteredEmail(enteredValue)
        break
      case 'confirmEmail':
        setEnteredConfirmEmail(enteredValue)
        break
      case 'password':
        setEnteredPassword(enteredValue)
        break
      case 'confirmPassword':
        setEnteredConfirmPassword(enteredValue)
        break
    }
  }

  function submitHandler() {
    onSubmit({
      email: enteredEmail,
      confirmEmail: enteredConfirmEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
      rememberCredentials: rem,
    })
  }

  return (
    <View style={styles.form}>
      <View>
        <View style={styles.inputs}>
          <Input
            label='Email'
            onUpdateValue={updateInputValueHandler.bind(null, 'email')}
            value={enteredEmail}
            keyboardType='email-address'
            isInvalid={emailIsInvalid}
          />
          {!isLogin && (
            <Input
              label='Подтвердите Email'
              onUpdateValue={updateInputValueHandler.bind(null, 'confirmEmail')}
              value={enteredConfirmEmail}
              keyboardType='email-address'
              isInvalid={emailsDontMatch}
            />
          )}
          <Input
            label='Пароль'
            onUpdateValue={updateInputValueHandler.bind(null, 'password')}
            secure
            value={enteredPassword}
            isInvalid={passwordIsInvalid}
          />
          {!isLogin && (
            <Input
              label='Пдтвердите Пароль'
              onUpdateValue={updateInputValueHandler.bind(
                null,
                'confirmPassword'
              )}
              secure
              value={enteredConfirmPassword}
              isInvalid={passwordsDontMatch}
            />
          )}
        </View>

        <BouncyCheckbox
          size={18}
          fillColor={COLORS(themeId).primary500}
          // unfillColor='#FFFFFF'
          text='Запомнить?'
          iconStyle={{ borderColor: COLORS(themeId).primary200 }}
          innerIconStyle={{ borderWidth: 2 }}
          textStyle={{ color: COLORS(themeId).primary100 }}
          isChecked={rem}
          onPress={(isChecked: boolean) => {
            setRem(isChecked)
          }}
        />

        <View style={styles.buttons}>
          <Button onPress={submitHandler}>
            {isLogin ? 'Войти' : 'Зарегистрироваться'}
          </Button>
        </View>
      </View>
    </View>
  )
}

export default AuthForm

const styles = StyleSheet.create({
  buttons: {
    marginTop: 22,
  },
  inputs: {
    marginBottom: 20,
  },
  form: {},
})
