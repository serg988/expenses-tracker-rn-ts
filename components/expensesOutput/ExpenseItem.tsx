import { useNavigation } from '@react-navigation/native'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { COLORS } from '../../constants/styles'
import useColor from '../../hooks/useColor'
import { Expense } from '../../types'
import { getFormattedDate } from '../../util/date'
import Button from '../ui/Button'

interface Props {
  expense: Expense
}

function ExpenseItem({ expense }: Props) {
  const navigation = useNavigation<any>()
  const themeId = useColor()

  const styles = StyleSheet.create({
    pressed: {
      opacity: 0.75,
    },
    button: {
      backgroundColor: COLORS(themeId).accent500,
      // paddingHorizontal: 3,
      borderRadius: 24,
      overflow: 'hidden',
    },
    item: {
      padding: 8,
      marginVertical: 8,
      backgroundColor: COLORS(themeId).primary500,
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderRadius: 6,
      elevation: 3,
      shadowColor: COLORS(themeId).gray500,
      shadowRadius: 4,
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.4,
    },
    textBase: {
      color: COLORS(themeId).primary50,
    },
    descriptionContainer: {
      flex: 25,
    },
    description: {
      fontSize: 16,
      marginBottom: 4,
      fontWeight: 'bold',
    },
    category: {
      color: COLORS(themeId).primary700,
      fontSize: 16,
      marginBottom: 4,
      fontWeight: 'bold',
      fontStyle: 'italic',
    },
    amountContainer: {
      flex: 1,
      paddingHorizontal: 12,
      paddingVertical: 4,
      backgroundColor: COLORS(themeId).primary50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      minWidth: 50,
      marginLeft: 10,
    },
    amountText: {
      color: COLORS(themeId).primary800,
      fontWeight: 'bold',
    },
    catDateContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    catContainer: {
      backgroundColor: COLORS(themeId).accent500,
      paddingHorizontal: 3,
      borderRadius: 12,
    },
  })

  function pressHandler() {
    navigation.navigate('ManageExpense', { id: expense.id })
  }

  return (
    <Pressable
      onPress={pressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.item}>
        <View style={styles.descriptionContainer}>
          <Text style={[styles.textBase, styles.description]}>
            {expense.description}
          </Text>
          <View style={styles.catDateContainer}>
            <View style={styles.catContainer}>
              <Button
                outsideStyle={styles.button}
                onPress={() => {
                  navigation.navigate('MonthlyStatistics', {
                    cat: expense.category,
                  })
                }}
              >
                {expense.category}
              </Button>
              {/* <Pressable>
                <Text style={[styles.textBase, styles.category]}>
                {expense.category}
              </Text>
              </Pressable>
               */}
            </View>

            <Text style={styles.textBase}>
              {getFormattedDate(expense.date)}
            </Text>
          </View>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amountText}>{expense.amount.toFixed(0)}</Text>
        </View>
      </View>
    </Pressable>
  )
}

export default ExpenseItem
