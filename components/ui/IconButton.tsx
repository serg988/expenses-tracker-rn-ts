import { StyleSheet, Pressable, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'

interface Props {
  onPress: () => void
  icon: keyof typeof Ionicons.glyphMap
  color: string
  size: number
}

function IconButton({ icon, color, size, onPress }: Props) {
  return (
    <Pressable
      // android_ripple={{ color: '#3e3d3d' }}
      style={({ pressed }) => pressed && styles.pressed}
      onPress={onPress}
    >
      <View style={styles.container}>
        <Ionicons name={icon} size={size} color={color} />
      </View>
    </Pressable>
  )
}

export default IconButton

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    padding: 6,
    marginHorizontal: 8,
    marginVertical: 2,
  },

  pressed: {
    opacity: 0.8,
  },
})
