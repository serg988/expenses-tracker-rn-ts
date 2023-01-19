import { useLayoutEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
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

  function confirmHandler() {
    if (isEditing) {
      dispatch(
        updateExpense({
          id,
          description: 'string@!!!!!!!',
          amount: 22,
          date: new Date(),
        })
      )
    } else {
      dispatch(
        addExpense({
          expense: {
            description: 'string',
            amount: 22,
            date: new Date(),
          },
        })
      )
    }
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button style={styles.button} mode='flat' onPress={cancelHandler}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={confirmHandler}>
          {isEditing ? 'Update' : 'Add'}
        </Button>
      </View>
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
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopColor: GlobalStyles.colors.primary200,
    borderTopWidth: 2,
    alignItems: 'center',
  },
})
