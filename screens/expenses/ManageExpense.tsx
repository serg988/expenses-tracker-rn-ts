import { useLayoutEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import ExpenseForm, {
  SubmitType,
} from '../../components/manageExpense/ExpenseForm'
import Button from '../../components/ui/Button'
import ErrorOverlay from '../../components/ui/ErrorOverlay'
import IconButton from '../../components/ui/IconButton'
import LoadingOverlay from '../../components/ui/LoadingOverlay'
import { COLORS } from '../../constants/styles'
import useTheme from '../../hooks/useTheme'
import {
  // addExpense,
  addNewExpense,
  deleteExpense,
  resetError,
  updateExpense,
} from '../../store/expensesSlice'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import store from '../../store/store'
// import { storeExpense } from '../util/http'

function ManageExpense({ route, navigation }: any) {
  const themeId = useTheme()
  const id: string = route.params?.id
  const isEditing = !!id
  const dispatch = useAppDispatch()

  const allExpenses = useAppSelector((state) => state.expenses.expenses)
  const loading = useAppSelector((state) => state.expenses.loading)
  const error = useAppSelector((state) => state.expenses.error)

  const selectedExpense = allExpenses.find((expense) => expense.id === id)

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Редактировать Расход' : 'Добавить Расход',
    })
  }, [navigation, isEditing])

  function DeleteHandler() {
    dispatch(deleteExpense(id))
    navigation.goBack()
  }

  function cancelHandler() {
    navigation.goBack()
  }

  function confirmHandler(expense: SubmitType) {
    if (isEditing) {
      dispatch(updateExpense({ ...expense, id }))
    } else {
      dispatch(addNewExpense(expense))
      // dispatch(
      //   addExpense({
      //     expense: expense,
      //   })
      // )
    }
    navigation.goBack()
  }

  if (loading) {
    return <LoadingOverlay />
  }

  if (error) {
    return (
      <ErrorOverlay message={error} onConfirm={() => dispatch(resetError())} />
    )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: COLORS(themeId).primary800,
    },

    deleteContainer: {
      marginTop: 16,
      paddingTop: 8,
      borderTopColor: COLORS(themeId).primary200,
      borderTopWidth: 2,
      alignItems: 'center',
    },
  })

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        submitButtonLabel={isEditing ? 'Редактировать' : 'Добавить'}
        defaultValues={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon='trash'
            color={COLORS().error500}
            size={36}
            onPress={DeleteHandler}
          />
        </View>
      )}
    </View>
  )
}

export default ManageExpense
