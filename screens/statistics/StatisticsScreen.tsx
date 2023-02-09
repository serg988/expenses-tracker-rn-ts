import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Dimensions } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Select from '../../components/manageExpense/Select'
import ErrorOverlay from '../../components/ui/ErrorOverlay'
import LoadingOverlay from '../../components/ui/LoadingOverlay'
import { CatArrayType, catArray } from '../../constants/categories'
import { COLORS } from '../../constants/styles'
import { fetchExpenses, resetError } from '../../store/expensesSlice'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { getDateMinusDays } from '../../util/date'
import useTheme from '../../hooks/useTheme'
import { periodArray, PeriodArrayType } from '../../constants/periods'
import { Expense } from '../../types'

function StatisticsScreen() {
  const [period, setPeriod] = useState<PeriodArrayType>()
  const dispatch = useAppDispatch()
  const themeId = useTheme()

  useEffect(() => {
    dispatch(fetchExpenses())
  }, [])

  const expenses = useAppSelector((state) => state.expenses.expenses)

  // Filter by month-------------------------------------

  const dates = expenses.map((e) => e.date.getMonth() + 1)
  function getExpensesByMonth(month: number) {
    const filteredByMonth = expenses.filter(
      (e) => e.date.getMonth() === month - 1
    )
    return filteredByMonth
  }

  // Filter for last SOME days
  function filterExpensesForPeriod(days: number) {
    const recentExpenses = expenses.filter((expense) => {
      const today = new Date()
      const someDaysAgo = getDateMinusDays(today, days)
      return expense.date > someDaysAgo
    })
    return recentExpenses
  }

  // Filter by CATEGORY-----------------------------------
  function getExpensesByCategory(category: CatArrayType) {
    const filteredByCat = expenses.filter((c) => c.category === category)
    return filteredByCat
  }

  //Reduce selected expenses-------------------
  function reduceExpenses(expenses: Expense[]) {
    const expensesSumArray = expenses.map((e) => e.amount)
    const expensesSum = expensesSumArray.reduce((sum, expense) => {
      return sum + expense
    }, 0)
    return expensesSum
  }
  

  //-----------------------------------------

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

  const data = periodArray.map((p) => {
    return { key: p, value: p }
  })

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

  // switch (period) {
  //   case 'За неделю':
  //     return
  // }

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
          onSelect={(selected) => {
            //@ts-ignore
            setPeriod(selected)
          }}
          defaultOption={{ key: 'За неделю', value: 'За неделю' }}
        />
      </View>

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.chartContainer}>
          <View>{chart}</View>
        </View>
      </ScrollView>
    </View>
  )
}

export default StatisticsScreen
