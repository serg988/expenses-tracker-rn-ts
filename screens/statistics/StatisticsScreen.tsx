import { ReactNode, useEffect, useState } from 'react'
import { Text, View, StyleSheet, Dimensions } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Select from '../../components/manageExpense/Select'
import { CatArrayType, catArray } from '../../constants/categories'
import { COLORS } from '../../constants/styles'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { getDateMinusDays } from '../../util/date'
import useTheme from '../../hooks/useTheme'
import { periodArray, PeriodArrayType } from '../../constants/periods'
import { Expense } from '../../types'
import { useIsFocused } from '@react-navigation/native'

type BarLength = {
  [key: string]: number
}

function StatisticsScreen() {
  const [period, setPeriod] = useState<PeriodArrayType>()
  const [barLength, setBarLength] = useState<BarLength>({})
  const [maxBar, setMaxBar] = useState(1)
  const maxWidth = Dimensions.get('window').width
  const isFocused = useIsFocused()
  
  const themeId = useTheme()

  const expenses = useAppSelector((state) => state.expenses.expenses)
  useEffect(() => {
    setBars()
    const arr = Object.values(barLength)
    const max = Math.max(...arr)
    setMaxBar(max)
    setPeriod('За неделю')
  }, [period, setPeriod, setBarLength, maxBar, isFocused])

  //Set bars lengths
  function setBars() {
    catArray.forEach((cat) => {
      const catData = getExpensesByCategory(cat)
  
      if (catData.length > 0) {
        setBarLength((prev) => {
          return { ...prev, [cat]: reduceExpenses(catData) }
        })
      } else {
        setBarLength((prev) => {
          return { ...prev, [cat]: 0 }
        })
      }
    })
  }


  // Filter by month-------------------------------------

  const dates = expenses.map((e) => e.date.getMonth() + 1)
  function getExpensesByMonth(month: number) {
    const filteredByMonth = expenses.filter(
      (e) => e.date.getMonth() === month - 1
    )
    return filteredByMonth
  }

  // Filter for last SOME days
  function filterExpensesForPeriod(days = 0) {
    const recentExpenses = expenses.filter((expense) => {
      if (period === 'За неделю') days = 7
      if (period === 'За месяц') days = 30
      if (period === 'За год') days = 365
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
      // margin: 10,
      marginLeft: 0,
      marginBottom: 27,
      padding: 10,
      height: 35,
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
      fontSize: 10
    }
  })

  let chart: ReactNode

  if (barLength) {
    chart = catArray.map((cat) => (
      <View key={cat}>
        <View style={styles.labelContainer}>
          <Text style={styles.legend}>{cat}</Text>
        </View>
        <View style={styles.barContainer}>
          <View
            style={[
              styles.bar,
              {
                width: (barLength[cat] / maxBar) * maxWidth || 1,
                maxWidth: Dimensions.get('window').width * 0.8,
                minWidth: 50
              },
              // { width: Dimensions.get('window').width * Math.random() * 0.8 },
            ]}
          ><Text style={styles.amountText}>{barLength[cat]}</Text></View>
        </View>
      </View>
    ))
  }

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
