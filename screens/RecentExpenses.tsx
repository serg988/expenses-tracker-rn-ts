import { View, Text, StyleSheet } from 'react-native'
import ExpensesOutput from '../components/expensesOutput/ExpensesOutput'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { getDateMinusDays } from '../util/date'

function RecentExpenses() {
  const expenses = useAppSelector((state) => state.expenses.expenses)
  const recentExpenses = expenses.filter(expense => {
    const today = new Date()
    const date7ago = getDateMinusDays(today, 7)

    return expense.date > date7ago
  })
  
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