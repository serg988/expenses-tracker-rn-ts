import { useLayoutEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import ExpenseForm, {
  SubmitType,
} from '../components/manageExpense/ExpenseForm'
import Button from '../components/ui/Button'
import IconButton from '../components/ui/IconButton'
import { GlobalStyles } from '../constants/styles'
import {
  addExpense,
  deleteExpense,
  updateExpense,
} from '../store/expensesSlice'
import { useAppSelector, useAppDispatch } from '../store/hooks'

function ManageExpense({ route, navigation }: any) {
  const id = route.params?.id
  const isEditing = !!id
  const dispatch = useAppDispatch()

  const allExpenses = useAppSelector((state) => state.expenses.expenses)

  const selectedExpense = allExpenses.find((expense) => expense.id === id)
  

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    })
  }, [navigation, isEditing])

  function DeleteHandler() {
    dispatch(deleteExpense({ id: id }))
    navigation.goBack()
  }

  function cancelHandler() {
    navigation.goBack()
  }

  function confirmHandler(expense: SubmitType) {
    if (isEditing) {
      dispatch(updateExpense({ ...expense, id }))
    } else {
      dispatch(
        addExpense({
          expense: expense,
        })
      )
    }
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        defaultValues={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon='trash'
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={DeleteHandler}
          />
        </View>
      )}
    </View>
  )
}

export default ManageExpense

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopColor: GlobalStyles.colors.primary200,
    borderTopWidth: 2,
    alignItems: 'center',
  },
})
