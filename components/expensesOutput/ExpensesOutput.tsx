import { View, Text, StyleSheet } from 'react-native'
import { GlobalStyles } from '../../constants/styles'
import { Expense } from '../../types'
import ExpensesList from './ExpensesList'
import ExpensesSummary from './ExpensesSummary'

const DUMMY: Expense[] = [
  {
    id: 'e1',
    description: 'Pet food',
    amount: 33.0,
    date: new Date('2023-01-16'),
  },
  {
    id: 'e2',
    description: 'Cat food',
    amount: 9.99,
    date: new Date('2023-01-17'),
  },
  {
    id: 'e3',
    description: 'Dog food',
    amount: 49.9,
    date: new Date('2023-01-18'),
  },
  {
    id: 'e4',
    description: 'Banana',
    amount: 4.99,
    date: new Date('2023-01-18'),
  },
  {
    id: 'e5',
    description: 'Sugar',
    amount: 2.99,
    date: new Date('2022-12-18'),
  },
  {
    id: 'e6',
    description: 'Pet food',
    amount: 33.0,
    date: new Date('2023-01-16'),
  },
  {
    id: 'e7',
    description: 'Cat food',
    amount: 9.99,
    date: new Date('2023-01-17'),
  },
  {
    id: 'e8',
    description: 'Dog food',
    amount: 49.9,
    date: new Date('2023-01-18'),
  },
  {
    id: 'e9',
    description: 'Banana',
    amount: 4.99,
    date: new Date('2023-01-18'),
  },
  {
    id: 'e10',
    description: 'Sugar',
    amount: 2.99,
    date: new Date('2022-12-18'),
  },
]

interface Props{
  expenses?: Expense
  expensesPeriod: string
}

function ExpensesOutput({ expenses, expensesPeriod }: Props) {
 

  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={DUMMY} periodName={expensesPeriod} />
      <ExpensesList expenses={DUMMY}/>
    </View>
  )
}

export default ExpensesOutput

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700
  }
})