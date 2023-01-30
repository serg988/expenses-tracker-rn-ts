import 'react-native-get-random-values'
import axios from 'axios'

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

//@ts-ignore
import { API_KEY } from 'react-native-dotenv'
import AsyncStorage from '@react-native-async-storage/async-storage'

type initialState = {
  token: string
  loading: boolean
  error?: string
}

const initialState: initialState = {
  token: '',
  loading: false,
  error: '',
}

export const login = createAsyncThunk<
  string,
  { email: string; password: string },
  { rejectValue: string }
>('auth/login', async function ({ email, password }, { rejectWithValue }) {
  try {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
    const res = await axios.post(url, {
      email,
      password,
      returnSecureToken: true,
    })
    const token = res.data.idToken
    await AsyncStorage.setItem('token', token)
    return token
  } catch (error: any) {
    return rejectWithValue(error.message)
  }
})
export const signup = createAsyncThunk<
  string,
  { email: string; password: string },
  { rejectValue: string }
>('auth/signup', async function ({ email, password }, { rejectWithValue }) {
  try {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`
    const res = await axios.post(url, {
      email,
      password,
      returnSecureToken: true,
    })
    const token = res.data.idToken
    AsyncStorage.setItem('token', token)
    return token
  } catch (error: any) {
    return rejectWithValue(error.message)
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticate(state, action) {
      state.token = action.payload
    },
    logout(state) {
      state.token = ''
      AsyncStorage.removeItem('token')
    },
    resetError(state) {
      state.error = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = ''
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload
        state.loading = false
        state.error = ''
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload
        state.loading = false
      })
      .addCase(signup.pending, (state) => {
        state.loading = true
        state.error = ''
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.token = action.payload
        state.loading = false
        state.error = ''
      })
      .addCase(signup.rejected, (state, action) => {
        state.error = action.payload
        state.loading = false
      })

    // .addMatcher(isError, (state, action: PayloadAction<string>) => {
    //   state.error = action.payload
    //   state.loading = false
    // })
  },
})

export default authSlice.reducer
export const {authenticate, logout} = authSlice.actions
