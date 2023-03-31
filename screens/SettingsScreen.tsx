import React, { SetStateAction, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ScrollView, View, Text, Button, StyleSheet } from 'react-native'
import { RadioButton } from 'react-native-paper'
import { COLORS } from '../constants/styles'
import { setTheme } from '../store/settingsSlice'
import useColor from '../hooks/useColor'
import { useAppSelector } from '../hooks/hooks'

const SettingsScreen = ({ navigation }: any) => {
  const colorTheme = useAppSelector((state) => state.settings.themeId)
  const themeId = useColor()
  const dispatch = useDispatch()
  const [value, setValue] = useState<SetStateAction<number>>(colorTheme)
  const [font, setFont] = useState<SetStateAction<number>>(1)

  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      paddingTop: 20,
      backgroundColor: COLORS(themeId).primary100,
    },
    title: {
      textAlign: 'center',
      fontSize: 20,
      // marginBottom: 7,
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
  })

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
          label='2'
          value={'1'}
        />
        <RadioButton.Item
          color={COLORS(themeId).accent500}
          label='3'
          value={'2'}
        />
        <RadioButton.Item
          color={COLORS(themeId).accent500}
          label='4'
          value={'3'}
        />
      </RadioButton.Group>

      <View style={styles.separator} />

      {/* <Text style={styles.title}>Размер шрифта:</Text> */}
      {/* <RadioButton.Group
        onValueChange={(value) => {
          setFont(+value)
          // dispatch(setFontSize(value))
        }}
        value={font}
      >
        <RadioButton.Item
          color={COLORS(themeId).accent500}
          label='Маленький'
          value={0}
        />
        <RadioButton.Item
          color={COLORS(themeId).accent500}
          label='Средний'
          value={1}
        />
        <RadioButton.Item
          color={COLORS(themeId).accent500}
          label='Большой'
          value={2}
        />
        <RadioButton.Item color={COLORS(themeId).accent500} label='XXXL' value={3} />
      </RadioButton.Group> */}
      <View style={styles.buttonContainer}>
        <Button
          title='Назад'
          color={COLORS(themeId).accent500}
          onPress={() => navigation.goBack()}
        />
      </View>
    </ScrollView>
  )
}

export default SettingsScreen
