import axios from 'axios'

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { API_KEY } from '../env'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getAsyncStorageData } from '../util/auth'

type initialState = {
  token: string
  ttd: number // time when token expires
  refreshToken: string
  loading: boolean
  error?: string
  remember: boolean
}

const initialState: initialState = {
  token: '',
  ttd: 0,
  refreshToken: '',
  loading: false,
  error: '',
  remember: false,
}

//--------------------LOG IN-------------------------

export const login = createAsyncThunk<
  { token: string; refreshToken: string; ttd: number },
  { email: string; password: string; rememberCredentials?: boolean },
  { rejectValue: string }
>(
  'auth/login',
  async function (
    { email, password, rememberCredentials },
    { rejectWithValue }
  ) {
    try {
      const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
      const res = await axios.post(url, {
        email,
        password,
        returnSecureToken: true,
      })
      const token = res.data.idToken
      const refreshToken = res.data.refreshToken
      const expiresIn = res.data.expiresIn
      const currentTime = +new Date().getTime()
      const ttd = currentTime + +expiresIn * 1000
      await AsyncStorage.multiSet([
        ['token', token],
        ['refreshToken', refreshToken],
      ])
      if (rememberCredentials) {
        AsyncStorage.multiSet([
          ['email', email],
          ['password', password],
          ['ttd', ttd.toString()],
        ])
      } else {
        // AsyncStorage.multiRemove(['email', 'password'])
      }

      return { token, refreshToken, ttd }
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

//--------------------STORED LOG IN-------------------------

export const loginStored = createAsyncThunk<
  { token: string; refreshToken: string; ttd: number },
  { email: string; password: string },
  { rejectValue: string }
>(
  'auth/loginStored',
  async function ({ email, password }, { rejectWithValue }) {
    try {
      const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
      const res = await axios.post(url, {
        email,
        password,
        returnSecureToken: true,
      })
      const token = res.data.idToken
      const refreshToken = res.data.refreshToken
      const expiresIn = res.data.expiresIn
      const currentTime = +new Date().getTime()
      const ttd = currentTime + +expiresIn * 1000
      await AsyncStorage.multiSet([
        ['token', token],
        ['refreshToken', refreshToken],
      ])
      return { token, refreshToken, ttd }
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

//--------------------SIGN UP-------------------------

export const signup = createAsyncThunk<
  { token: string; refreshToken: string },
  { email: string; password: string; rememberCredentials: boolean },
  { rejectValue: string }
>(
  'auth/signup',
  async function (
    { email, password, rememberCredentials },
    { rejectWithValue }
  ) {
    try {
      const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`
      const res = await axios.post(url, {
        email,
        password,
        returnSecureToken: true,
      })
      const token = res.data.idToken
      const refreshToken = res.data.refreshToken
      await AsyncStorage.multiSet([
        ['token', token],
        ['refreshToken', refreshToken],
      ])
      if (rememberCredentials) {
        AsyncStorage.multiSet([
          ['email', email],
          ['password', password],
        ])
      } else {
        AsyncStorage.multiRemove(['email', 'password'])
      }
      return { token, refreshToken }
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)
//<+><-><+><-><+><-><+><-><+><-><+><-><+><-><+><-><+><-><+><-><+><-><+><->
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    //--------------------AUTHENTICATE-------------------

    authenticate(state, action) {
      state.token = action.payload
    },

    //--------------------LOGOUT-------------------------

    logout(state) {
      state.token = ''
      AsyncStorage.multiRemove(['token', 'email', 'password', 'remember'])
    },

    //--------------------DELETE TOKEN-------------------------

    deleteToken(state) {
      state.token = ''
      // state.ttd = 3600
    },

    resetError(state) {
      state.error = ''
    },
  },
  //<+><-><+><-><+><-><+><-><+><-><+><-><+><-><+><-><+><-><+><-><+><-><+><->
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = ''
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token
        state.refreshToken = action.payload.refreshToken
        state.ttd = action.payload.ttd
        state.loading = false
        state.error = ''
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload
        state.loading = false
      })
      .addCase(loginStored.pending, (state) => {
        state.loading = true
        state.error = ''
      })
      .addCase(loginStored.fulfilled, (state, action) => {
        state.token = action.payload.token
        state.refreshToken = action.payload.refreshToken
        state.ttd = action.payload.ttd
        state.loading = false
        state.error = ''
      })
      .addCase(loginStored.rejected, (state, action) => {
        state.error = action.payload
        state.loading = false
      })
      .addCase(signup.pending, (state) => {
        state.loading = true
        state.error = ''
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.token = action.payload.token
        state.refreshToken = action.payload.refreshToken
        state.loading = false
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
export const { authenticate, logout, deleteToken } = authSlice.actions
