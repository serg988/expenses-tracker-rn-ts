import axios from 'axios'
//@ts-ignore
import { API_KEY } from 'react-native-dotenv'

export async function signup(
  email: string,
  password: string
) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`
  const res = await axios.post(url, {
    email,
    password,
    returnSecureToken: true,
  })
  const token = res.data.idToken
  return token
}
export async function login(
  email: string,
  password: string
) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
  const res = await axios.post(url, {
    email,
    password,
    returnSecureToken: true,
  })
  const token = res.data.idToken
  return token
}

