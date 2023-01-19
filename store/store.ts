import { configureStore } from '@reduxjs/toolkit'

import expensesSlice from './expensesSlice'

const store = configureStore({
  reducer: {
    expenses: expensesSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})


export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
