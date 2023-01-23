import { View, Text, StyleSheet, TextInput, StyleProp } from 'react-native'
import { GlobalStyles } from '../../constants/styles'

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
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: GlobalStyles.colors.primary700,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.error50,
  },
})
