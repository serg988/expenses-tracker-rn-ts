import { View, Text, StyleSheet } from 'react-native'
import { GlobalStyles } from '../../constants/styles'
import Button from './Button'

interface Props{
  message: string
  onConfirm:()=>void
}

function ErrorOverlay({ message, onConfirm }: Props) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>Error!</Text>
      <Text style={styles.text}>{message}</Text>
      <Button onPress={onConfirm}>Okey</Button>
    </View>
  )
}

export default ErrorOverlay


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20
  }
})