import 'react-native-gesture-handler'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'
import ManageExpense from './screens/expenses/ManageExpense'
import RecentExpenses from './screens/expenses/RecentExpenses'
import AllExpenses from './screens/expenses/AllExpenses'
import { BottomTabNavigatorParamList, RootStackParamList } from './types'
import { COLORS } from './constants/styles'

import { Ionicons } from '@expo/vector-icons'
import IconButton from './components/ui/IconButton'
import { Provider, useDispatch } from 'react-redux'
import store, { persistor } from './store/store'
import LoginScreen from './screens/auth/LoginScreen'
import SignupScreen from './screens/auth/SignupScreen'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { authenticate } from './store/authSlice'
import SettingsScreen from './screens/SettingsScreen'
import Logout from './screens/auth/Logout'

import useTheme from './hooks/useColor'
import { setTheme } from './store/settingsSlice'
import StatisticsScreen from './screens/statistics/StatisticsScreen'
import MonthlyStatisticsScreen from './screens/statistics/MonthlyStatisticsScreen'

import { PersistGate } from 'redux-persist/integration/react'
import { fetchCategories, fetchExpenses } from './store/expensesSlice'

const Stack = createNativeStackNavigator<any>()
const BottomTabs = createBottomTabNavigator<BottomTabNavigatorParamList>()
const Drawer = createDrawerNavigator<any>()

export function DrawerNavigation() {
  const themeId = useTheme()
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS(themeId).primary500,
        },
        headerTintColor: COLORS(themeId).primary50,
        sceneContainerStyle: {
          backgroundColor: COLORS(themeId).primary500,
        },
        drawerContentStyle: {
          backgroundColor: COLORS(themeId).primary500,
        },
        drawerInactiveTintColor: COLORS(themeId).primary50,
        drawerActiveTintColor: COLORS(themeId).primary50,
        drawerActiveBackgroundColor: COLORS(themeId).primary500,
      }}
    >
      <Drawer.Screen
        name='Expenses Overview'
        component={MainNavigation}
        options={{
          headerShown: false,
          title: 'Все Расходы',
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name='cash'
              size={size}
              color={focused ? COLORS(themeId).accent500 : '#ccc'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name='Statistics'
        component={StatisticsScreen}
        options={{
          headerShown: true,
          title: 'Статистика',
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name='bar-chart'
              size={size}
              color={focused ? COLORS(themeId).accent500 : '#ccc'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name='Settings'
        component={SettingsScreen}
        options={{
          title: 'Настройки',
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name='settings'
              size={size}
              color={focused ? COLORS(themeId).accent500 : '#ccc'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name='Logout'
        component={Logout}
        options={{
          title: 'Выход',
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name='exit'
              size={size}
              color={focused ? COLORS(themeId).accent500 : '#ccc'}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  )
}

//------------------AUTH STACK-------------------------------------

function AuthStack() {
  const themeId = useTheme()
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS(themeId).primary500 },
        headerTintColor: COLORS(themeId).primary50,
        contentStyle: { backgroundColor: COLORS(themeId).primary100 },
      }}
    >
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Signup' component={SignupScreen} />
    </Stack.Navigator>
  )
}

//------------------MAIN NAVIGATOR BOTTOM TABS-------------------------------------

function ExpensesOverview() {
  const themeId = useTheme()
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerShown: true,
        headerStyle: {
          backgroundColor: COLORS(themeId).primary500,
        },
        headerTintColor: COLORS(themeId).primary50,
        tabBarStyle: {
          backgroundColor: COLORS(themeId).primary500,
        },
        tabBarActiveTintColor: COLORS(themeId).accent500,
        headerRight: ({ tintColor }) => (
          <IconButton
            icon='add'
            size={24}
            color={tintColor || COLORS(themeId).primary50}
            onPress={() => navigation.navigate('ManageExpense')}
          />
        ),
        headerLeft: ({ tintColor }) => (
          <IconButton
            icon='menu'
            size={24}
            color={tintColor || COLORS(themeId).primary50}
            onPress={() => navigation.openDrawer()}
          />
        ),
      })}
    >
      <BottomTabs.Screen
        name='RecentExpenses'
        component={RecentExpenses}
        options={{
          title: 'Последние Расходы',
          tabBarLabel: 'Последние',
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name='hourglass' size={size} color={color} />
          },
        }}
      />
      <BottomTabs.Screen
        name='AllExpenses'
        component={AllExpenses}
        options={{
          title: 'Все Расходы',
          tabBarLabel: 'Все Расходы',
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name='calendar' size={size} color={color} />
          },
        }}
      />
    </BottomTabs.Navigator>
  )
}

//------------------MAIN NAVIGATOR STACK-------------------------------------

function MainNavigation({ navigation, route }: any) {
  const themeId = useTheme()
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS(themeId).primary500,
        },
        headerTintColor: COLORS(themeId).primary50,
      }}
    >
      <Stack.Screen
        name='ExpensesOverview'
        component={ExpensesOverview}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='MonthlyStatistics'
        component={MonthlyStatisticsScreen}
        options={
          ({ route }) => ({
            title: `${route?.params?.cat} - статистика по месяцам`,
          })
          // headerShown: true,
          // title: 'Статистика по месяцам',
          // headerLeft: ({ tintColor }) => (
          //   <IconButton
          //     icon='menu'
          //     size={24}
          //     color={tintColor || COLORS(themeId).primary50}
          //     onPress={() => navigation.openDrawer()}
          //   />
          // ),
        }
      />
      <Stack.Screen name='ManageExpense' component={ManageExpense} />
    </Stack.Navigator>
  )
}

//------------------ROOT CONDITIONAL RENDERING----------------------------

function Root() {
  const token = useAppSelector((state) => state.auth.token)
  const ttd = useAppSelector((state) => state.auth.ttd)

  const dispatch = useAppDispatch()

  useEffect(() => {
    async function fn() {
      const colorTheme = await AsyncStorage.getItem('colorTheme')
      if (colorTheme) {
        dispatch(setTheme(colorTheme))
      }
    }
    fn()
  }, [])

  const [timer, setTimer] = useState(0)
  const [ttl, setTtl] = useState(3600)
  //====================================++++++++++++++++++++++++++++++++++++++
  const limit = 30

  useEffect(() => {
    dispatch(fetchExpenses())
    dispatch(fetchCategories())

  }, [token])

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev += 1))
    }, 3000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    const ttl = (ttd - +new Date().getTime()) / 1000
    setTtl(ttl)
  }, [timer])

  useEffect(() => {
    async function getToken() {
      const storedToken = await AsyncStorage.getItem('token')
      if (storedToken) {
        dispatch(authenticate(storedToken))
      }
    }
    getToken()
  }, [])

  return <>{!token || ttl < limit ? <AuthStack /> : <DrawerNavigation />}</>
  // return <>{!token || ttl < limit ? <AuthStack /> : <DrawerNavigation />}</>
}

export default function App() {
  return (
    <>
      <StatusBar style='auto' />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <Root />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </>
  )
}
