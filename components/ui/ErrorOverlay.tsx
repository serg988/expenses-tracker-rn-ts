import { View, Text, StyleSheet } from 'react-native'
import { COLORS } from '../../constants/styles'
import useTheme from '../../hooks/useTheme'
import Button from './Button'

interface Props {
  message: string
  onConfirm: () => void
}

function ErrorOverlay({ message, onConfirm }: Props) {
  const themeId = useTheme()

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      backgroundColor: COLORS(themeId).primary700,
    },
    text: {
      color: COLORS(themeId).primary50,
      textAlign: 'center',
      marginBottom: 8,
    },
    title: {
      fontWeight: 'bold',
      fontSize: 20,
    },
  })


  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>Error!</Text>
      <Text style={styles.text}>{message}</Text>
      <Button onPress={onConfirm}>Okey</Button>
    </View>
  )
}

export default ErrorOverlay

