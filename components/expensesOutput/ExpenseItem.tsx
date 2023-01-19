import { useNavigation } from '@react-navigation/native'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { GlobalStyles } from '../../constants/styles'
import { Expense } from '../../types'
import { getFormattedDate } from '../../util/date'

interface Props {
  expense: Expense
}

function ExpenseItem({ expense }: Props) {
  const navigation = useNavigation<any>()

  function pressHandler() {
    navigation.navigate('ManageExpense', {id: expense.id})
  }

  return (
    <Pressable
      onPress={pressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.item}>
        <View>
          <Text style={[styles.textBase, styles.description]}>
            {expense.description}
          </Text>
          <Text style={styles.textBase}>{getFormattedDate(expense.date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amountText}>{expense.amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  )
}

export default ExpenseItem

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  item: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    minWidth: 80,
  },
  amountText: {
    color: GlobalStyles.colors.primary800,
    fontWeight: 'bold',
  },
})
