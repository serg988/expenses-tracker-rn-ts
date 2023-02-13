import { useState } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'

import Button from '../ui/Button'
import Input from './Input'
import { Expense } from '../../types'
import { COLORS } from '../../constants/styles'
import useColor from '../../hooks/useColor'
import Select from './Select'
import { catArray, CatArrayType } from '../../constants/categories'

export type SubmitType = {
  id?: string
  category: CatArrayType
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
  const themeId = useColor()
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
    category: {
      value: defaultValues ? defaultValues.category : 'Продукты',
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
      color: COLORS(themeId).primary50,
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
    categoriesLabel: {
      color: COLORS(themeId).primary100,
      fontSize: 12,
      marginHorizontal: 8,
      marginBottom: -5,
    },
  })

  function inputHandler(
    id: 'amount' | 'date' | 'description' | 'category',
    value: string
  ) {
    return setInput((prev) => {
      return { ...prev, [id]: { value, isValid: true } }
    })
  }

  function submitHandler() {
    const expenseData = {
      amount: +input.amount.value,
      date: new Date(input.date.value),
      description: input.description.value,
      category: input.category.value,
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
          category: { value: prev.category.value, isValid: true },
        }
      })

      return
    }
    onSubmit(expenseData)
  }

  const formIsInvalid =
    !input.amount.isValid || !input.date.isValid || !input.description.isValid

  const data = catArray.map((cat) => {
    return { key: cat, value: cat }
  })

  const selectDefaultValue = input.category.value
    ? { key: input.category.value, value: input.category.value }
    : { key: 'Продукты', value: 'Продукты' }

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
      <Text style={styles.categoriesLabel}>Категория</Text>

      <Select
        onSelect={(selected: string) => {
          inputHandler('category', selected)
        }}
        data={data}
        defaultOption={selectDefaultValue}
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
