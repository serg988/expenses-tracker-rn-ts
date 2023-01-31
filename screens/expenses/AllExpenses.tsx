import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect } from 'react'
import ExpensesOutput from '../../components/expensesOutput/ExpensesOutput'
import ErrorOverlay from '../../components/ui/ErrorOverlay'
import LoadingOverlay from '../../components/ui/LoadingOverlay'
import { fetchExpenses, resetError } from '../../store/expensesSlice'
import { useAppSelector, useAppDispatch } from '../../store/hooks'

function AllExpenses() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchExpenses())
  }, [])

  const expenses = useAppSelector((state) => state.expenses.expenses)
  const loading = useAppSelector((state) => state.expenses.loading)
  const error = useAppSelector((state) => state.expenses.error)

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
      expensesPeriod='Total'
      expenses={expenses}
      fallbackText='No expenses yet.'
    />
  )
}

export default AllExpenses
