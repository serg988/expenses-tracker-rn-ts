import { View, Text, StyleSheet, TextInput, StyleProp } from 'react-native'
import { COLORS } from '../../constants/styles'

// DateTimePickerAndroid.open(params: AndroidNativeProps)
// DateTimePickerAndroid.dismiss(mode: AndroidNativeProps['mode'])

interface Props {
  label: string
  invalid: boolean
  textInputConfig: {
    keyboardType?: 'default' | 'numeric' | 'decimal-pad'
    maxLength?: number
    onChangeText: (amountValue: string) => void
    placeholder?: string
    multiline?: boolean
    value: string
  }
  style?: any
}

function Input({ label, textInputConfig, invalid, style }: Props) {
  const inputStyles = [styles.input]
  if (textInputConfig && textInputConfig.multiline) {
    //@ts-ignore
    inputStyles.push(styles.inputMultiline)
  }

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput
        style={[inputStyles, invalid && styles.invalidInput]}
        {...textInputConfig}
      />
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 4,
    marginHorizontal: 8,
  },
  label: {
    fontSize: 12,
    color: COLORS().primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: COLORS().primary100,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: COLORS().primary700,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  invalidLabel: {
    color: COLORS().error500,
  },
  invalidInput: {
    backgroundColor: COLORS().error50,
  },
})
