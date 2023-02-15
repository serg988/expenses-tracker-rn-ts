import { View, Text, StyleSheet, Pressable } from 'react-native'
import { COLORS } from '../../constants/styles'
import useColor from '../../hooks/useColor'

interface Props {
  children: string
  onPress: () => void
  mode?: 'flat'
  outsideStyle?: {}
}

function Button({ children, onPress, mode, outsideStyle }: Props) {
  const themeId = useColor()

  const styles = StyleSheet.create({
    button: {
      borderRadius: 4,
      padding: 8,
      backgroundColor: COLORS(themeId).primary500,
    },
    flat: {
      backgroundColor: 'transparent',
    },
    buttonText: {
      color: COLORS(themeId).primary50,
      textAlign: 'center',
    },
    flatText: {
      color: COLORS(themeId).primary200,
    },
    pressed: {
      opacity: 0.75,
      backgroundColor: COLORS(themeId).primary100,
      borderRadius: 4,
    },
  })

  return (
    <View style={outsideStyle}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View
          style={[
            // outsideStyle,
            styles.button,
            mode === 'flat' && styles.flat,
            outsideStyle,
          ]}
        >
          <Text style={[styles.buttonText, mode === 'flat' && styles.flatText]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  )
}

export default Button
