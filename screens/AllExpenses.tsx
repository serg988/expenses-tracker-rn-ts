import { View, Text, StyleSheet } from 'react-native'
import ExpensesOutput from '../components/expensesOutput/ExpensesOutput'

function AllExpenses() {
  return (
    <ExpensesOutput expensesPeriod='Total'/>
  )
}

export default AllExpenses

const styles = StyleSheet.create({})