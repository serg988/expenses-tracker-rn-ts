import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect } from 'react'
import ExpensesOutput from '../../components/expensesOutput/ExpensesOutput'
import ErrorOverlay from '../../components/ui/ErrorOverlay'
import LoadingOverlay from '../../components/ui/LoadingOverlay'
import { fetchExpenses, resetError } from '../../store/expensesSlice'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { getDateMinusDays } from '../../util/date'

function AllExpenses() {
  const dispatch = useAppDispatch()

  // useEffect(() => {
  //   dispatch(fetchExpenses())
  // }, [])

  const expenses = useAppSelector((state) => state.expenses.expenses)
  const transformedExpenses = expenses.map((e) => ({
    ...e,
    date: new Date(e.date),
  }))
  const loading = useAppSelector((state) => state.expenses.loading)
  const error = useAppSelector((state) => state.expenses.error)

  //  const recentExpenses = expenses.filter((expense) => {
  //    const today = new Date()
  //    const date7ago = getDateMinusDays(today, 365)

  //    return expense.date > date7ago
  //  })

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
      expensesPeriod='Всего'
      expenses={expenses}
      fallbackText='Расходы не найдены.'
    />
  )
}

export default AllExpenses
