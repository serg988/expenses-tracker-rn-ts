import { View, Text, StyleSheet, Pressable } from 'react-native'
import { COLORS } from '../../constants/styles'

interface Props {
  children: string
  onPress: () => void
  mode?: 'flat'
  style?: {}
}

function Button({ children, onPress, mode, style }: Props) {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={[styles.button, mode === 'flat' && styles.flat]}>
          <Text style={[styles.buttonText, mode === 'flat' && styles.flatText]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  )
}

export default Button

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: COLORS().primary500,
  },
  flat: {
    backgroundColor: 'transparent',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  flatText: {
    color: COLORS().primary200,
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: COLORS().primary100,
    borderRadius: 4,
  },
})
