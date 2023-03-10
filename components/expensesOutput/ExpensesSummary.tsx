import { View, Text, StyleSheet } from 'react-native'
import { COLORS } from '../../constants/styles'
import useColor from '../../hooks/useColor'
import { Expense } from '../../types'

interface Props {
  expenses: Expense[]
  periodName: any
}

function ExpensesSummary({ expenses, periodName }: Props) {
  const themeId = useColor()

  const styles = StyleSheet.create({
    container: {
      padding: 8,
      backgroundColor: COLORS(themeId).primary50,
      borderRadius: 6,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignContent: 'center',
    },
    period: {
      fontSize: 12,
      color: COLORS(themeId).primary500,
    },
    sum: {
      fontSize: 16,
      fontWeight: 'bold',
      color: COLORS(themeId).primary500,
    },
  })

  const expensesSumArray = expenses.map((e) => e.amount)
  const expensesSum = expensesSumArray.reduce((sum, expense) => {
    return sum + expense
  }, 0)
  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.sum}>{expensesSum.toFixed(2)}</Text>
    </View>
  )
}

export default ExpensesSummary
