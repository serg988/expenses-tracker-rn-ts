import { configureStore } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'
import authSlice from './authSlice'
import expensesSlice from './expensesSlice'
import settingsSlice from './settingsSlice'

import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'

const reducers = combineReducers({
  expenses: expensesSlice,
  auth: authSlice,
  settings: settingsSlice,
})

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['counter'],
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
