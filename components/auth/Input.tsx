import { View, Text, TextInput, StyleSheet } from 'react-native'

import useTheme from '../../hooks/useTheme'
import { COLORS } from '../../constants/styles'

interface Props {
  label: string
  keyboardType?: 'default' | 'numeric' | 'email-address'
  secure?: boolean
  onUpdateValue: any
  value: string
  isInvalid: boolean
}

function Input({
  label,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
}: Props) {
  const themeId = useTheme()
  

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    color: COLORS(themeId).primary50,
    marginBottom: 4,
  },
  labelInvalid: {
    color: COLORS(themeId).error500,
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: COLORS(themeId).primary100,
    borderRadius: 4,
    fontSize: 16,
  },
  inputInvalid: {
    backgroundColor: COLORS(themeId).error50,
  },
})
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
        {label}
      </Text>
      <TextInput
        style={[styles.input, isInvalid && styles.inputInvalid]}
        // autoCapitalize={false}
        autoCapitalize='none'
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
      />
    </View>
  )



}

export default Input

