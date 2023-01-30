import { View, Text, StyleSheet } from 'react-native'
import { GlobalStyles } from '../../constants/styles'
import { Expense } from '../../types'
import ExpensesList from './ExpensesList'
import ExpensesSummary from './ExpensesSummary'

interface Props {
  expenses: Expense[]
  expensesPeriod: string
  fallbackText: string
}

function ExpensesOutput({ expenses, expensesPeriod, fallbackText }: Props) {
  let content = <Text style={styles.fallbackText}>{fallbackText}</Text>

  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />
  }

  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      {content}
    </View>
  )
}

export default ExpensesOutput

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  fallbackText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 172,
  },
})