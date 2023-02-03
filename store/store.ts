import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import expensesSlice from './expensesSlice'
import settingsSlice from './settingsSlice'

const store = configureStore({
  reducer: {
    expenses: expensesSlice,
    auth: authSlice,
    settings: settingsSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})


export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
