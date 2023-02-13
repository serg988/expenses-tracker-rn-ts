import { View, ActivityIndicator, Text, StyleSheet } from 'react-native'
import { COLORS } from '../../constants/styles'
import useColor from '../../hooks/useColor'

interface Props {
  message?: string
}

function LoadingOverlay({ message }: Props) {
  const themeId = useColor()
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      backgroundColor: COLORS(themeId).primary700,
    },
    message: { fontSize: 16, marginBottom: 12 },
  })

  return (
    <View style={styles.container}>
      {message && <Text style={styles.message}>{message}</Text>}
      <ActivityIndicator size='large' color={COLORS(themeId).primary50} />
    </View>
  )
}

export default LoadingOverlay
