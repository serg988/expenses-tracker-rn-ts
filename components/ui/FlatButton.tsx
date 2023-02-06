import { Pressable, StyleSheet, Text, View } from 'react-native'

import { COLORS } from '../../constants/styles'
import useTheme from '../../hooks/useTheme'

interface Props {
  children: string
  onPress: () => void
}

function FlatButton({ children, onPress }: Props) {
  const themeId = useTheme()

  const styles = StyleSheet.create({
    button: {
      paddingVertical: 6,
      paddingHorizontal: 12,
    },
    pressed: {
      opacity: 0.7,
    },
    buttonText: {
      textAlign: 'center',
      color: COLORS(themeId).primary100,
    },
  })

  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </Pressable>
  )
}

export default FlatButton
