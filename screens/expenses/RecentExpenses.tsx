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

function RecentExpenses({ navigation }: any) {

  const dispatch = useAppDispatch()

  const expenses = useAppSelector((state) => state.expenses.expenses)
  const loading = useAppSelector((state) => state.expenses.loading)

  // const ttd = useAppSelector((state) => state.auth.ttd)
  const error = useAppSelector((state) => state.expenses.error)

 


  useEffect(() => {
    dispatch(fetchExpenses())
  }, [])

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date()
    const date7ago = getDateMinusDays(today, 7)

    return expense.date > date7ago
  })

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
      expensesPeriod='Last 7 days'
      expenses={recentExpenses}
      fallbackText='No expenses for the last 7 days.'
    />
  )
}

export default RecentExpenses

const styles = StyleSheet.create({})
