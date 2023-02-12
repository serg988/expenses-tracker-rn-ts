import { View, Text, StyleSheet } from 'react-native'

function MonthlyStatisticsScreen({ route }: any) {
  const {cat} = route.params
  return (
    <View style={styles.container}>
      <Text>
        {cat}
      </Text>
    </View>
  )
}

export default MonthlyStatisticsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})