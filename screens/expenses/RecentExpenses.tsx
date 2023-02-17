import { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import ExpensesOutput from '../../components/expensesOutput/ExpensesOutput'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { fetchExpenses, resetError } from '../../store/expensesSlice'
import { getDateMinusDays } from '../../util/date'
import LoadingOverlay from '../../components/ui/LoadingOverlay'
import ErrorOverlay from '../../components/ui/ErrorOverlay'
import { getAsyncStorageData } from '../../util/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { REHYDRATE } from 'redux-persist'

function RecentExpenses({ navigation }: any) {
  const dispatch = useAppDispatch()

  const expenses = useAppSelector((state) => state.expenses.expenses)
  const transformedExpenses = expenses.map(e=>({...e, date: new Date(e.date)}))

  const loading = useAppSelector((state) => state.expenses.loading)

  const error = useAppSelector((state) => state.expenses.error)

  // useEffect(() => {
  //   dispatch(fetchExpenses())
  // }, [])

  const recentExpenses = transformedExpenses.filter((expense) => {
    const today = new Date()
    const date7ago = getDateMinusDays(today, 7)
    const dateObj = new Date(expense.date)
    return dateObj > date7ago
  })
  
  // console.log("🚀 ~ file: RecentExpenses.tsx:33 ~ recentExpenses ~ expenses", expenses)
 
  if (error) {
    return (
      <ErrorOverlay message={error} onConfirm={() => dispatch(resetError())} />
    )
  }

  if (loading) {
    return <LoadingOverlay />
  }

  return (
    <ExpensesOutput
      expensesPeriod='Последние 7 Дней'
      expenses={recentExpenses}
      fallbackText='Расходы за последние 7 дней не найдены.'
    />
  )
}

export default RecentExpenses
