import {
  NavigationContainer,
  useNavigationContainerRef,
  useNavigation,
} from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { View, Text } from 'react-native'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ManageExpense from './screens/expenses/ManageExpense'
import RecentExpenses from './screens/expenses/RecentExpenses'
import AllExpenses from './screens/expenses/AllExpenses'
import { BottomTabNavigatorParamList, RootStackParamList } from './types'
import { GlobalStyles } from './constants/styles'

const Stack = createNativeStackNavigator<any>()
// const Stack = createNativeStackNavigator<RootStackParamList>()
const BottomTabs = createBottomTabNavigator<BottomTabNavigatorParamList>()

import { Ionicons } from '@expo/vector-icons'
import IconButton from './components/ui/IconButton'
import { Provider } from 'react-redux'
import store from './store/store'
import LoginScreen from './screens/auth/LoginScreen'
import SignupScreen from './screens/auth/SignupScreen'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { authenticate, logout } from './store/authSlice'

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: GlobalStyles.colors.primary100 },
      }}
    >
      <Stack.Screen name='LoginScreen' component={LoginScreen} />
      <Stack.Screen name='Signup' component={SignupScreen} />
    </Stack.Navigator>
  )
}

function ExpensesOverview() {
  const dispatch = useAppDispatch()
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        headerTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({ tintColor }) => (
          <IconButton
            icon='add'
            size={24}
            color={tintColor || 'white'}
            onPress={() => navigation.navigate('ManageExpense')}
          />
        ),
        headerLeft: ({ tintColor }) => (
          <IconButton
            icon='exit'
            size={24}
            color={tintColor || 'white'}
            onPress={() => dispatch(logout())}
          />
        ),
      })}
    >
      <BottomTabs.Screen
        name='RecentExpenses'
        component={RecentExpenses}
        options={{
          title: 'Recent Expenses',
          tabBarLabel: 'Recent',
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name='hourglass' size={size} color={color} />
          },
        }}
      />
      <BottomTabs.Screen
        name='AllExpenses'
        component={AllExpenses}
        options={{
          title: 'All Expenses',
          tabBarLabel: 'All Expenses',
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name='calendar' size={size} color={color} />
          },
        }}
      />
    </BottomTabs.Navigator>
  )
}

function MainNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen
        name='ExpensesOverview'
        component={ExpensesOverview}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='ManageExpense'
        component={ManageExpense}
        options={{
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  )
}

function AboveRoot() {
  return <Root />
}

function Root() {
  const token = useAppSelector((state) => state.auth.token)
  const ttd = useAppSelector((state) => state.auth.ttd)

  const dispatch = useAppDispatch()

  const [timer, setTimer] = useState(0)
  const [relogin, setRelogin] = useState(false)
  const [ttl, setTtl] = useState(3600)
  //====================================++++++++++++++++++++++++++++++++++++++
  const limit = 8

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev += 1))
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    const ttl = (ttd - +new Date().getTime()) / 1000
    console.log("🚀 ~ file: App.tsx:157 ~ useEffect ~ ttl", ttl)
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

  return <>{!token || ttl < limit ? <AuthStack /> : <MainNavigation />}</>
}

export default function App() {
  const navigationRef = useNavigationContainerRef()
  return (
    <>
      <StatusBar style='auto' />
      <Provider store={store}>
        <NavigationContainer ref={navigationRef}>
          <AboveRoot />
        </NavigationContainer>
      </Provider>
    </>
  )
}
