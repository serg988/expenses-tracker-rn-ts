import { View, ActivityIndicator, Text, StyleSheet } from 'react-native'
import { COLORS} from '../../constants/styles'

interface Props {
  message?: string
}

function LoadingOverlay({ message }: Props) {
  return (
    <View style={styles.container}>
      {message && <Text style={styles.message}>{message}</Text>}
      <ActivityIndicator size='large' color='#fff' />
    </View>
  )
}

export default LoadingOverlay

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: COLORS().primary700,
  },
  message: { fontSize: 16, marginBottom: 12 },
})
