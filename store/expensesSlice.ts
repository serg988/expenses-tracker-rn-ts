import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Expense } from '../types'

type initialState = {
  expenses: Expense[]
}

const initialState: initialState = {
  expenses: [
    {
      id: 'e1',
      description: 'Pet food',
      amount: 33.0,
      date: new Date('2023-01-16'),
    },
    {
      id: 'e2',
      description: 'Cat food',
      amount: 9.99,
      date: new Date('2023-01-17'),
    },
    {
      id: 'e3',
      description: 'Dog food',
      amount: 49.9,
      date: new Date('2023-01-18'),
    },
    {
      id: 'e4',
      description: 'Banana',
      amount: 4.99,
      date: new Date('2023-01-18'),
    },
    {
      id: 'e5',
      description: 'Sugar',
      amount: 2.99,
      date: new Date('2022-12-18'),
    },
    {
      id: 'e6',
      description: 'Pet food',
      amount: 33.0,
      date: new Date('2023-01-16'),
    },
    {
      id: 'e7',
      description: 'Cat food',
      amount: 9.99,
      date: new Date('2023-01-17'),
    },
    {
      id: 'e8',
      description: 'Dog food',
      amount: 49.9,
      date: new Date('2023-01-18'),
    },
    {
      id: 'e9',
      description: 'Banana',
      amount: 4.99,
      date: new Date('2023-01-18'),
    },
    {
      id: 'e10',
      description: 'Sugar',
      amount: 2.99,
      date: new Date('2022-12-18'),
    },
  ],
}

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense: (
      state,
      action: PayloadAction<{
        expense: { description: string; amount: number; date: Date }
      }>
    ) => {
      console.log('🚀 ~ file: expensesSlice.ts:84 ~ action', action)

      const newExpense = {
        ...action.payload.expense,
        id: uuidv4(),
      }
      state.expenses.push(newExpense)
    },
    deleteExpense: (state, action: PayloadAction<{ id: string }>) => {
      // state.expenses.splice(state.expenses.id.indexOf(action.payload.id), 1)
      state.expenses = state.expenses.filter(
        (expense) => expense.id !== action.payload.id
      )
    },
    updateExpense: (
      state,
      action: PayloadAction<{
        id: string
        description: string
        amount: number
        date: Date
      }>
    ) => {
      const expenseIndex = state.expenses.findIndex(
        (expense) => expense.id === action.payload.id
      )
      const updatableExpense = state.expenses[expenseIndex]
      const updatedItem = { ...updatableExpense, ...action.payload }
      state.expenses[expenseIndex] = updatedItem
    },
  },
})

export default expensesSlice.reducer
export const { addExpense, updateExpense, deleteExpense } =
  expensesSlice.actions
