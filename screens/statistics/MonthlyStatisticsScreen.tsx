import { useIsFocused } from '@react-navigation/native'
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native'
import { useAppSelector } from '../../hooks/hooks'
import useColor from '../../hooks/useColor'
import { COLORS } from '../../constants/styles'
import { ReactNode, useEffect, useState } from 'react'
import { catArray, CatArrayType } from '../../constants/categories'
import { monthsArray, MonthsArrayType } from '../../constants/months'
import { Expense } from '../../types'
import { getDateMinusDays } from '../../util/date'

type BarLength = {
  [key: string]: number
}

function MonthlyStatisticsScreen({ route }: any) {
  const maxWidth = Dimensions.get('window').width
  const isFocused = useIsFocused()

  const themeId = useColor()

  const expenses = useAppSelector((state) => state.expenses.expenses)
  const { cat } = route.params
  const [barLength, setBarLength] = useState<BarLength>({})
  console.log(
    '🚀 ~ file: MonthlyStatisticsScreen.tsx:25 ~ MonthlyStatisticsScreen ~ barLength',
    barLength
  )
  const [maxBar, setMaxBar] = useState(1)

  useEffect(() => {
    setBars()
  }, [isFocused, expenses])

  useEffect(() => {
    getMax()
  }, [barLength])

  function getMax() {
    const arr = Object.values(barLength)
    const max = Math.max(...arr)
    setMaxBar(max)
  }

  //Set bars lengths
  function setBars() {
    const filteredByCategory = getExpensesByCategory(cat)

    monthsArray.forEach((month) => {
      const monthData = getExpensesByMonth(month, filteredByCategory)

      if (monthData.length > 0) {
        setBarLength((prev) => {
          return { ...prev, [month]: reduceExpenses(monthData) }
        })
      } else {
        setBarLength((prev) => {
          return { ...prev, [month]: 0 }
        })
      }
    })
  }

  // Filter by CATEGORY-----------------------------------
  function getExpensesByCategory(category: CatArrayType) {
    const filteredByCat = expenses.filter((c) => c.category === category)
    return filteredByCat
  }
  // Filter by MONTH-----------------------------------
  function getExpensesByMonth(month: MonthsArrayType, expenses: Expense[]) {
    const monthNumber = monthsArray.indexOf(month)
    const filteredByMonth = expenses.filter(
      (e) => e.date.getMonth() === monthNumber
    )
    return filteredByMonth
  }

  // Filter for last 30 days
  // function filterExpensesForPeriod(days = 0) {
  //   const recentExpenses = expenses.filter((expense) => {
  //     const today = new Date()
  //     const someDaysAgo = getDateMinusDays(today, 30)
  //     return expense.date > someDaysAgo
  //   })
  //   console.log("🚀 ~ file: MonthlyStatisticsScreen.tsx:73 ~ recentExpenses ~ recentExpenses", recentExpenses)

  //   return recentExpenses
  // }

  // Filter by month-------------------------------------

  const dates = expenses.map((e) => e.date.getMonth() + 1)

  //Reduce selected expenses-------------------
  function reduceExpenses(expenses: Expense[]) {
    const expensesSumArray = expenses.map((e) => e.amount)
    const expensesSum = expensesSumArray.reduce((sum, expense) => {
      return sum + expense
    }, 0)
    return expensesSum
  }

  const styles = StyleSheet.create({
    scrollContainer: {
      height: '100%',
    },
    chartContainer: {
      flex: 1,
      backgroundColor: COLORS(themeId).primary500,
    },
    barContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    bar: {
      justifyContent: 'center',
      marginLeft: 0,
      marginBottom: 27,
      padding: 1,
      height: 25,
      backgroundColor: 'yellow',
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20,
    },
    labelContainer: {
      paddingLeft: 3,
    },
    legend: {
      color: COLORS(themeId).primary50,
    },
    amountText: {
      fontSize: 10,
    },
  })

  let chart: ReactNode

  if (barLength) {
    chart = monthsArray.map((month) => (
      <View key={month}>
        <View style={styles.labelContainer}>
          <Text style={styles.legend}>{month}</Text>
        </View>
        <View style={styles.barContainer}>
          <View
            style={[
              styles.bar,
              {
                width:
                  barLength[month] && maxBar
                    ? (barLength[month] / maxBar) * maxWidth
                    : // ? (Math.pow(barLength[month], 1.5) / Math.pow(maxBar, 1.5)) *
                      //   maxWidth
                      0,
                maxWidth: Dimensions.get('window').width * 0.95,
                minWidth: 30,
              },
            ]}
          >
            <View
              style={{
                borderTopRightRadius: 20,
                borderBottomRightRadius: 20,
                justifyContent: 'center',
                height: 35,
                overflow: 'hidden',
              }}
            >
              <Text style={styles.amountText}>{barLength[month]}</Text>
            </View>
          </View>
        </View>
      </View>
    ))
  }

  return (
    <View>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.chartContainer}>
          <View>{chart}</View>
        </View>
      </ScrollView>
    </View>
  )
}

export default MonthlyStatisticsScreen
