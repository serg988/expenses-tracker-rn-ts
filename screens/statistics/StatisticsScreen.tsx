import { ReactNode, useEffect, useState } from 'react'
import { Text, View, StyleSheet, Dimensions, Pressable } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Select from '../../components/manageExpense/Select'
import { CatArrayType, catArray } from '../../constants/categories'
import { COLORS } from '../../constants/styles'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { getDateMinusDays } from '../../util/date'
import useColor from '../../hooks/useColor'
import { Expense } from '../../types'
import { useIsFocused } from '@react-navigation/native'
import { SelectList } from 'react-native-dropdown-select-list'

type BarLength = {
  [key: string]: number
}

function StatisticsScreen({ navigation }: any) {
  const [period, setPeriod] = useState(7)

  const [barLength, setBarLength] = useState<BarLength>({})
  const [maxBar, setMaxBar] = useState(1)

  const maxWidth = Dimensions.get('window').width
  const isFocused = useIsFocused()

  const themeId = useColor()

  const expenses = useAppSelector((state) => state.expenses.expenses)

  useEffect(() => {
    setBars(period)
  }, [isFocused, period, expenses])

  useEffect(() => {
    getMax()
  }, [barLength])

  function getMax() {
    const arr = Object.values(barLength)
    const max = Math.max(...arr)
    setMaxBar(max)
  }

  //Set bars lengths
  function setBars(period: number) {
    const filteredByDays = filterExpensesForPeriod(period)

    catArray.forEach((cat) => {
      const catData = getExpensesByCategory(cat, filteredByDays)

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

  

  // Filter for last SOME days
  function filterExpensesForPeriod(days = 0) {
    const recentExpenses = expenses.filter((expense) => {
      const today = new Date()
      const someDaysAgo = getDateMinusDays(today, period)
      return expense.date > someDaysAgo
    })

    return recentExpenses
  }

  // Filter by CATEGORY-----------------------------------
  function getExpensesByCategory(category: CatArrayType, expenses: Expense[]) {
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

  function pressHandler(cat: CatArrayType) {
    navigation.navigate('MonthlyStatistics', { cat: cat }) //
  }

  //-----------------------------------------

  const styles = StyleSheet.create({
    selectContainer: {
      marginBottom: 20,
    },
    scrollContainer: {
      height: '100%',
    },
    chartContainer: {
      flex: 1,
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
      fontSize: 10,
    },
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
                width:
                  barLength[cat] && maxBar
                    ? (barLength[cat] / maxBar) * maxWidth
                    : // ? (Math.pow(barLength[cat], 1.5) / Math.pow(maxBar, 1.5)) *
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
                height: 35,
                overflow: 'hidden',
              }}
            >
              <Pressable
                style={{
                  height: 35,
                  overflow: 'hidden',
                  justifyContent: 'center',
                }}
                android_ripple={{
                  color: '#dcdf19',
                }}
                onPress={pressHandler.bind(null, cat)}
              >
                <Text style={styles.amountText}>{barLength[cat]}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    ))
  }

  // const data = periodArray.map((p) => {
  //   return { key: p, value: p }
  // })

  const data = [
    { value: 'Сегодня', key: 1 },
    { value: 'За неделю', key: 7 },
    { value: 'За месяц', key: 30 },
    { value: 'За год', key: 365 },
  ]

  return (
    <View>
      <View style={styles.selectContainer}>
        <SelectList
          onSelect={() => setBars(period)}
          setSelected={(val: number) => setPeriod(val)}
          data={data}
          save='key'
          search={false}
          boxStyles={{
            borderRadius: 8,
            marginHorizontal: 8,
            marginTop: 10,
            backgroundColor: COLORS(themeId).primary100,
          }}
          inputStyles={{
            color: COLORS(themeId).primary700,
            fontSize: 18,
          }}
          dropdownTextStyles={{
            color: COLORS(themeId).primary500,
            backgroundColor: COLORS(themeId).primary50,
            marginHorizontal: 8,
            padding: 8,
            borderRadius: 8,
          }}
          defaultOption={{ key: 7, value: 'За неделю' }}
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
