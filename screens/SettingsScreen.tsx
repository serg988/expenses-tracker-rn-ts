import React, { SetStateAction, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ScrollView, View, Text, StyleSheet, Alert } from 'react-native'
import { RadioButton } from 'react-native-paper'
import { COLORS } from '../constants/styles'
import { setTheme } from '../store/settingsSlice'
import useColor from '../hooks/useColor'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import Select from '../components/manageExpense/Select'
import { addNewCategory, deleteCategory } from '../store/expensesSlice'
import Input from '../components/manageExpense/Input'
import { SelectList } from 'react-native-dropdown-select-list'
import { TextInput } from 'react-native-gesture-handler'
import Button from '../components/ui/Button'

const SettingsScreen = ({ navigation }: any) => {
  const colorTheme = useAppSelector((state) => state.settings.themeId)
  const categories = useAppSelector((state) => state.expenses.categories)
  const expenses = useAppSelector((state) => state.expenses.expenses)
  // console.log(
  //   '🚀 ~ file: SettingsScreen.tsx:20 ~ SettingsScreen ~ expenses:',
  //   expenses
  // )
  const themeId = useColor()
  const dispatch = useAppDispatch()
  const [value, setValue] = useState<SetStateAction<number>>(colorTheme)
  const [input, setInput] = useState('')
  const [category, setCategory] = useState('')

  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      paddingTop: 20,
      backgroundColor: COLORS(themeId).primary100,
    },
    inputContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    input: {
      borderBottomWidth: 1,
      borderBottomColor: '#999',
      width: '70%',
    },
    title: {
      textAlign: 'center',
      fontSize: 20,
      // marginBottom: 7,
    },
    subTitle: {
      marginVertical: 7,
    },
    separator: {
      // flex: 1,
      height: 1,
      backgroundColor: COLORS(themeId).primary800,
      marginHorizontal: 10,
      marginBottom: 20,
    },
    buttonContainer: {
      // height: '30%',
      marginTop: 70,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    selectContainer: {
      marginBottom: 20,
    },
    catEditContainer: {
      marginHorizontal: 20,
    },
  })

  const data = categories.map((cat) => {
    return { key: cat.id, value: cat.cat }
  })

  function selectHandler() {
    if (category !== '-NSgC2DzWa9srfjdgKXj') {
      const catName = (categories?.filter((cat) => cat.id === category)[0]).cat
      // console.log(
      //   '🚀 ~ file: SettingsScreen.tsx:82 ~ selectHandler ~ catName:',
      //   catName
      // )

      return Alert.alert(
        'Точно?',
        `Вы точно хотите удалить категорию ${catName}?`,
        [
          {
            text: 'Да',
            onPress: () => {
              // console.log(category)
              checkIfCatIsNotEmpty()
            },
          },
          {
            text: 'Нет',
            onPress: () => navigation.navigate('Settings'),
          },
        ]
      )
    }
  }

  function checkIfCatIsNotEmpty() {
    
    const catName = (categories?.filter((cat) => cat.id === category)[0]).cat
    console.log(
      '🚀 ~ file: SettingsScreen.tsx:115 ~ checkIfCatIsNotEmpty ~ catName:',
      catName
    )

    if (expenses?.some((e) => e.category === catName)) {
      Alert.alert(
        'Невозможно',
        `Сначала удалите все расходы в категории ${catName}`
      )
    } else {
      dispatch(deleteCategory(category))
      setCategory('-NSgC2DzWa9srfjdgKXj')
      navigation.goBack()
    }
  }

  function addCatSubmitHandler() {
    dispatch(addNewCategory(input))
    setInput('')
  }

  return (
    <ScrollView style={styles.screen}>
      <Text style={styles.title}>Цветовая схема:</Text>
      <RadioButton.Group
        onValueChange={(value) => {
          setValue(+value)
          dispatch(setTheme(value))
        }}
        value={value.toString()}
      >
        <RadioButton.Item
          color={COLORS(themeId).accent500}
          label='Синяя'
          value={'0'}
        />
        <RadioButton.Item
          color={COLORS(themeId).accent500}
          label='Салатная'
          value={'1'}
        />
        <RadioButton.Item
          color={COLORS(themeId).accent500}
          label='Бирюзовая'
          value={'2'}
        />
        <RadioButton.Item
          color={COLORS(themeId).accent500}
          label='Оранж'
          value={'3'}
        />
      </RadioButton.Group>

      <View style={styles.separator} />

      <View style={styles.catEditContainer}>
        <Text style={styles.title}>Редактирование категорий</Text>

        <Text style={styles.subTitle}>Добавить категорию:</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setInput(text)}
            value={input}
          />
          <Button onPress={addCatSubmitHandler} style={{}}>
            Да
          </Button>
        </View>

        <Text style={styles.subTitle}>Удалить категорию:</Text>

        <View style={styles.selectContainer}>
          <SelectList
            onSelect={selectHandler}
            setSelected={(key: string) => setCategory(key)}
            data={data}
            save='key'
            search={false}
            boxStyles={{
              borderRadius: 8,
              marginHorizontal: 8,
              marginTop: 10,
              backgroundColor: COLORS(themeId).primary100,
            }}
            inputStyles={{
              color: COLORS(themeId).primary700,
              fontSize: 18,
            }}
            dropdownTextStyles={{
              color: COLORS(themeId).primary500,
              backgroundColor: COLORS(themeId).primary50,
              marginHorizontal: 8,
              padding: 8,
              borderRadius: 8,
            }}
            defaultOption={{ key: '-NSgC2DzWa9srfjdgKXj', value: 'Продукты' }}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            // color={COLORS(themeId).accent500}
            style={{}}
            onPress={() => navigation.goBack()}
          >
            Назад
          </Button>
        </View>
      </View>
    </ScrollView>
  )
}

export default SettingsScreen
