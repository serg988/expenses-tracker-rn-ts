import { View, Text, StyleSheet } from 'react-native'
import ExpensesOutput from '../components/expensesOutput/ExpensesOutput'
import { useAppSelector, useAppDispatch } from '../store/hooks'

function AllExpenses() {
   const expenses = useAppSelector(state=>state.expenses.expenses)
  return (
    <ExpensesOutput expensesPeriod='Total' expenses={expenses} fallbackText='No expenses yet.'/>
  )
}

export default AllExpenses

const styles = StyleSheet.create({})