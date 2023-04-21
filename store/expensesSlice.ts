import axios from 'axios'

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Expense } from '../types'

const BACKEND_URL =
  'https://max-rn-app-default-rtdb.europe-west1.firebasedatabase.app'

type initialState = {
  expenses: Expense[]
  categories: { id: string; cat: string }[]
  loading: boolean
  error?: string
}

const initialState: initialState = {
  expenses: [],
  categories: [],
  loading: false,
  error: '',
}

let token: string

export const fetchCategories = createAsyncThunk<
  { id: string; cat: string }[],
  void,
  { rejectValue: string; state: { auth: { token: string } } }
>(
  'expenses/fetchCategories',
  async function (_, { getState, rejectWithValue }) {
    const { auth } = getState()
    token = auth.token
    try {
      const response = await axios.get(
        BACKEND_URL + '/categories.json?auth=' + token
      )

      const categories = []

      for (const key in response.data) {
        const category = {
          id: key,
          cat: response.data[key].cat,
        }
        categories.push(category)
      }
      return categories
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

export const addNewCategory = createAsyncThunk<
  // { category: string; id: string },
  { id: string; cat: string },
  string,
  { rejectValue: string }
>(
  'expenses/addNewCategory',
  async function (category: string, { rejectWithValue }) {
    try {
      const response = await axios.post(
        BACKEND_URL + '/categories.json?auth=' + token,
        { cat: category }
      )
      console.log({ cat: category, id: response.data.name })
      return { cat: category, id: response.data.name }
      // return category
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

export const deleteCategory = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('expenses/deleteCategory', async function (id, { rejectWithValue }) {
  try {
    await axios.delete(BACKEND_URL + `/categories/${id}.json?auth=` + token)
    console.log('🚀 ~ file: expensesSlice.ts:88 ~ id:', id)
    return id
  } catch (error: any) {
    return rejectWithValue(error.message)
  }
})

export const fetchExpenses = createAsyncThunk<
  Expense[],
  void,
  { rejectValue: string; state: { auth: { token: string } } }
>('expenses/fetchExpenses', async function (_, { getState, rejectWithValue }) {
  const { auth } = getState()
  token = auth.token
  try {
    const response = await axios.get(
      BACKEND_URL + '/expenses.json?auth=' + token
    )
    const expenses = []

    for (const key in response.data) {
      const expenseObj = {
        id: key,
        amount: response.data[key].amount,
        description: response.data[key].description,
        date: response.data[key].date,
        category: response.data[key].category,
      }
      expenses.push(expenseObj)
      expenses.sort(function (a, b) {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      })
    }
    return expenses.reverse()
  } catch (error: any) {
    return rejectWithValue(error.message)
  }
})

export const addNewExpense = createAsyncThunk<
  Expense,
  Expense,
  { rejectValue: string }
>(
  'expenses/addNewExpense',
  async function (expense: Expense, { rejectWithValue }) {
    try {
      const response = await axios.post(
        BACKEND_URL + '/expenses.json?auth=' + token,
        expense
      )
      return { ...expense, id: response.data.name }
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

export const updateExpense = createAsyncThunk<
  Expense,
  Expense,
  { rejectValue: string }
>('expenses/updateExpense', async function (expense, { rejectWithValue }) {
  try {
    const { id } = expense
    const expenseData = { ...expense, id: undefined }
    const response = await axios.put(
      BACKEND_URL + `/expenses/${id}.json?auth=` + token,
      expenseData
    )
    return { ...response.data, id }
  } catch (error: any) {
    return rejectWithValue(error.message)
  }
})

export const deleteExpense = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('expenses/deleteExpense', async function (id, { rejectWithValue }) {
  try {
    await axios.delete(BACKEND_URL + `/expenses/${id}.json?auth=` + token)
    return id
  } catch (error: any) {
    return rejectWithValue(error.message)
  }
})

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    resetError(state) {
      state.error = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true
        state.error = ''
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload
        state.loading = false
        state.error = ''
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.error = action.payload
        state.loading = false
      })

      .addCase(addNewCategory.pending, (state) => {
        state.error = ''
        state.loading = true
      })
      .addCase(addNewCategory.fulfilled, (state, action) => {
        state.categories.unshift(action.payload)
        console.log(
          '🚀 ~ file: expensesSlice.ts:201 ~ .addCase ~ state.categories:',
          state.categories
        )
        state.loading = false
      })
      .addCase(addNewCategory.rejected, (state, action) => {
        state.error = action.payload
        state.loading = false
      })

      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true
        state.error = ''
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.expenses = action.payload
        state.loading = false
        state.error = ''
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.error = action.payload
        state.loading = false
      })

      .addCase(addNewExpense.pending, (state) => {
        state.error = ''
        state.loading = true
      })
      .addCase(addNewExpense.fulfilled, (state, action) => {
        state.expenses.unshift(action.payload)
        state.loading = false
      })
      .addCase(addNewExpense.rejected, (state, action) => {
        state.error = action.payload
        state.loading = false
      })

      // ----------DELETE CAT-------------
      .addCase(deleteCategory.pending, (state, action) => {
        state.loading = true
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (cat) => cat.id !== action.payload
        )
        state.loading = false
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.error = action.payload
        state.loading = false
      })
      // --------------------

      .addCase(updateExpense.pending, (state, action) => {
        state.loading = true
      })
      .addCase(updateExpense.fulfilled, (state, action) => {
        state.expenses = state.expenses.filter((expense) => {
          return expense.id !== action.payload.id
        })

        const updatedExpense = {
          ...action.payload,
          date: action.payload.date,
        }
        state.expenses.unshift(updatedExpense)
        state.loading = false
      })
      .addCase(updateExpense.rejected, (state, action) => {
        state.error = action.payload
        state.loading = false
      })
      .addCase(deleteExpense.pending, (state, action) => {
        state.loading = true
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.expenses = state.expenses.filter(
          (expense) => expense.id !== action.payload
        )
        state.loading = false
      })
      .addCase(deleteExpense.rejected, (state, action) => {
        state.error = action.payload
        state.loading = false
      })
    // .addMatcher(isError, (state, action: PayloadAction<string>) => {
    //   state.error = action.payload
    //   state.loading = false
    // })
  },
})

export default expensesSlice.reducer
export const { resetError } = expensesSlice.actions
