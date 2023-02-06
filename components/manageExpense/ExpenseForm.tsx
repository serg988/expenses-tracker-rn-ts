import { useState } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import Button from '../ui/Button'
import Input from './Input'
import { Expense } from '../../types'
import { COLORS } from '../../constants/styles'
import useTheme from '../../hooks/useTheme'

export type SubmitType = {
  id?: string
  amount: number
  description: string
  date: Date
}

interface Props {
  onCancel: () => void
  onSubmit: (expenseData: Expense) => void
  submitButtonLabel: string
  defaultValues?: Expense
}

function ExpenseForm({
  submitButtonLabel,
  onCancel,
  onSubmit,
  defaultValues,
}: Props) {
  const themeId = useTheme()
  const [input, setInput] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : '',
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : '',
      isValid: true,
    },
    date: {
      value: defaultValues
        ? defaultValues.date.toISOString().slice(0, 10)
        : new Date().toISOString().slice(0, 10),
      isValid: true,
    },
  })

  const styles = StyleSheet.create({
    form: {
      marginTop: 40,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff',
      textAlign: 'center',
      marginBottom: 40,
    },
    inputRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    errorText: {
      textAlign: 'center',
      color: COLORS(themeId).error500,
      fontSize: 16,
      margin: 8,
    },
    input: {
      flex: 1,
    },
    buttons: {
      marginTop: 50,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      minWidth: 120,
      marginHorizontal: 8,
    },
  })

  function inputHandler(id: 'amount' | 'date' | 'description', value: string) {
    return setInput((prev) => {
      return { ...prev, [id]: { value, isValid: true } }
    })
  }

  function submitHandler() {
    const expenseData = {
      amount: +input.amount.value,
      date: new Date(input.date.value),
      description: input.description.value,
    }

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date'
    const descriptionIsValid = expenseData.description.trim().length > 1

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      // Alert.alert('Invalid input', 'Please check your values')
      setInput((prev) => {
        return {
          amount: { value: prev.amount.value, isValid: amountIsValid },
          description: {
            value: prev.description.value,
            isValid: descriptionIsValid,
          },
          date: { value: prev.date.value, isValid: dateIsValid },
        }
      })
      return
    }
    onSubmit(expenseData)
  }

  const formIsInvalid =
    !input.amount.isValid || !input.date.isValid || !input.description.isValid
  return (
    <View style={styles.form}>
      <Text style={styles.title}>Ваш Расход</Text>
      <View style={styles.inputRow}>
        <Input
          style={styles.input}
          label='Сумма'
          invalid={!input.amount.isValid}
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputHandler.bind(null, 'amount'),
            value: input.amount.value,
          }}
        />
        <Input
          style={styles.input}
          label='Дата'
          invalid={!input.date.isValid}
          textInputConfig={{
            placeholder: 'ГГГГ-ММ-ДД',
            maxLength: 10,
            onChangeText: inputHandler.bind(null, 'date'),
            value: input.date.value,
          }}
        />
      </View>

      <Input
        label='Описание'
        invalid={!input.description.isValid}
        textInputConfig={{
          // multiline: true,
          onChangeText: inputHandler.bind(null, 'description'),
          value: input.description.value,
        }}
      />
      {formIsInvalid && <Text style={styles.errorText}>Invalid inputs!</Text>}
      <View style={styles.buttons}>
        <Button style={styles.button} mode='flat' onPress={onCancel}>
          Отмена
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  )
}

export default ExpenseForm
