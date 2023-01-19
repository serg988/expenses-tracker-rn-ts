import { View, Text, StyleSheet, FlatList } from 'react-native'
import { Expense } from '../../types'
import ExpenseItem from './ExpenseItem'



function renderData({item}: {item:Expense}) {
  return <ExpenseItem expense={item}/>
}
interface Props{
  expenses: Expense[]
}
function ExpensesList({expenses}: Props) {
  return <FlatList data={expenses} renderItem={renderData} />
}

export default ExpensesList

const styles = StyleSheet.create({})