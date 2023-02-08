import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect } from 'react'
import { Text, View, StyleSheet, Dimensions } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import ExpensesOutput from '../../components/expensesOutput/ExpensesOutput'
import Select from '../../components/manageExpense/Select'
import ErrorOverlay from '../../components/ui/ErrorOverlay'
import LoadingOverlay from '../../components/ui/LoadingOverlay'
import { catArray } from '../../constants/categories'
import { COLORS } from '../../constants/styles'
import { fetchExpenses, resetError } from '../../store/expensesSlice'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import useTheme from '../../hooks/useTheme'

function StatisticsScreen() {
  const dispatch = useAppDispatch()
  const themeId = useTheme()

  useEffect(() => {
    dispatch(fetchExpenses())
  }, [])

  const expenses = useAppSelector((state) => state.expenses.expenses)
  console.log(
    '🚀 ~ file: StatisticsScreen.tsx:20 ~ StatisticsScreen ~ expenses',
    expenses
  )
  const loading = useAppSelector((state) => state.expenses.loading)
  const error = useAppSelector((state) => state.expenses.error)

  if (error) {
    return (
      <ErrorOverlay message={error} onConfirm={() => dispatch(resetError())} />
    )
  }

  if (loading) {
    return <LoadingOverlay />
  }

  const data = [
    { key: 'week', value: 'За неделю' },
    { key: 'month', value: 'За месяц' },
    { key: 'year', value: 'За год' },
  ]

  const styles = StyleSheet.create({
    selectContainer: {
      marginBottom: 20,
    },
    scrollContainer: {
      // backgroundColor: 'yellow',
      height: '100%',
    },
    chartContainer: {
      flex: 1,
      // flexDirection: 'row',
    },
    barContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    bar: {
      // flex: 1,
      margin: 10,
      marginLeft: 0,
      marginBottom: 27,
      padding: 10,
      height: 45,
      backgroundColor: 'yellow',
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20,
    },
    labelContainer: {
      minWidth: '15%',
    },
    legend: {
      color: COLORS(themeId).primary50,
    },
  })

  const chart = catArray.map((cat) => (
    <View key={cat}>
      <View style={styles.barContainer}>
        <View
          style={[
            styles.bar,
            { width: Dimensions.get('window').width * Math.random() * 0.8 },
          ]}
        ></View>
        <View style={styles.labelContainer}>
          <Text style={styles.legend}>{cat}</Text>
        </View>
      </View>
    </View>
  ))

  return (
    <View>
      <View style={styles.selectContainer}>
        <Select
          data={data}
          onSelect={() => {}}
          defaultOption={{ key: 'week', value: 'За неделю' }}
        />
      </View>

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.chartContainer}>
          <View>{chart}</View>

          {/* <View>
            {catArray.map((cat) => (
              <Text>{cat}</Text>
            ))}
          </View> */}
        </View>
      </ScrollView>
    </View>
  )
}

export default StatisticsScreen
