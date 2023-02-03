// import { View, Text, StyleSheet } from 'react-native'

// import { COLORS() } from '../constants/styles'
// import React, { useState } from 'react'
// import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group'

// function SettingsScreen() {
//   const [radioButtons, setRadioButtons] = useState<RadioButtonProps[]>([
//     {
//       id: 'small', // acts as primary key, should be unique and non-empty string
//       label: 'Small',
//       value: 'option1',
//       size: 14,
//       labelStyle: { fontSize: 14 },
//     },
//     {
//       id: 'normal', // acts as primary key, should be unique and non-empty string
//       label: 'Normal',
//       value: 'option1',
//       size: 16,
//       labelStyle: { fontSize: 16 },
//     },
//     {
//       id: 'large', // acts as primary key, should be unique and non-empty string
//       label: 'Large',
//       value: 'option1',
//       size: 18,
//       labelStyle: { fontSize: 18 },
//     },
//   ])
//   console.log("🚀 ~ file: SettingsScreen.tsx:31 ~ SettingsScreen ~ radioButtons", radioButtons)

//   function onPressRadioButton(radioButtonsArray: RadioButtonProps[]) {
//     setRadioButtons(radioButtonsArray)
//   }

//   return (
//     <View style={styles.root}>
//       <Text style={styles.headerText}>Settings</Text>
//       <View style={styles.checkBoxContainer}>
//         <RadioGroup
//           radioButtons={radioButtons}
//           onPress={onPressRadioButton}
//           layout='row'
//         />
//       </View>
//     </View>
//   )
// }

// export default SettingsScreen

// const styles = StyleSheet.create({
//   root: {
//     flex: 1,
//     backgroundColor: COLORS().primary50,
//   },
//   headerText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginTop: 20,
//   },
//   checkBoxContainer: {
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//   },
//   label: {
//     fontSize: 12,
//   },
// })
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { ScrollView, View, Text, Button, StyleSheet } from 'react-native'
import { RadioButton } from 'react-native-paper'
import { COLORS } from '../constants/styles'
// import { setSource, setFontSize } from '../store/actions/settings'

const SettingsScreen = ({ navigation }: any) => {
  const dispatch = useDispatch()
  const [value, setValue] = useState(0)
  const [font, setFont] = useState(1)
  return (
    <ScrollView style={styles.screen}>
      <Text style={styles.title}>Цветовая схема:</Text>
      <RadioButton.Group
        onValueChange={(value) => {
          setValue(value)
          // dispatch(setSource(value))
        }}
        value={value}
      >
        <RadioButton.Item
          color={COLORS().accent500}
          label='Allanekdots.ru'
          value={0}
        />
        <RadioButton.Item
          color={COLORS().accent500}
          label='Anekdot.ru'
          value={1}
        />
      </RadioButton.Group>

      <View style={styles.separator} />

      <Text style={styles.title}>Размер шрифта:</Text>
      <RadioButton.Group
        onValueChange={(value) => {
          setFont(value)
          // dispatch(setFontSize(value))
        }}
        value={font}
      >
        <RadioButton.Item
          color={COLORS().accent500}
          label='Маленький'
          value={0}
        />
        <RadioButton.Item color={COLORS().accent500} label='Средний' value={1} />
        <RadioButton.Item color={COLORS().accent500} label='Большой' value={2} />
        <RadioButton.Item color={COLORS().accent500} label='XXXL' value={3} />
      </RadioButton.Group>
      <View style={styles.buttonContainer}>
        <Button
          title='Назад'
          color={COLORS().accent500}
          onPress={() => navigation.goBack()}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    // marginBottom: 7,
  },
  separator: {
    // flex: 1,
    height: 1,
    backgroundColor: COLORS().primary800,
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

export default SettingsScreen
