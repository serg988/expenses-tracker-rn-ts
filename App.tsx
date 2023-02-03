import 'react-native-gesture-handler'
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'
import ManageExpense from './screens/expenses/ManageExpense'
import RecentExpenses from './screens/expenses/RecentExpenses'
import AllExpenses from './screens/expenses/AllExpenses'
import { BottomTabNavigatorParamList, RootStackParamList } from './types'
import { GlobalStyles } from './constants/styles'

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
import SettingsScreen from './screens/SettingsScreen'

const Stack = createNativeStackNavigator<any>()
const BottomTabs = createBottomTabNavigator<BottomTabNavigatorParamList>()
const Drawer = createDrawerNavigator<any>()

export function DrawerNavigation() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        headerTintColor: '#fff',
        sceneContainerStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        drawerContentStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        drawerInactiveTintColor: '#fff',
        drawerActiveTintColor: GlobalStyles.colors.primary50,
        drawerActiveBackgroundColor: GlobalStyles.colors.primary500,
      }}
    >
      <Drawer.Screen name='Expenses Overview' component={MainNavigation} />
      <Drawer.Screen name='Settings' component={SettingsScreen} />
    </Drawer.Navigator>
  )
}

//------------------AUTH STACK-------------------------------------

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

//------------------MAIN NAVIGATOR BOTTOM TABS-------------------------------------

function ExpensesOverview() {
  const dispatch = useAppDispatch()
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerShown: false,
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

//------------------MAIN NAVIGATOR STACK-------------------------------------

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
      <Stack.Screen name='ManageExpense' component={ManageExpense} />
    </Stack.Navigator>
  )
}

//------------------ROOT CONDITIONAL RENDERING----------------------------

function Root() {
  const token = useAppSelector((state) => state.auth.token)
  const ttd = useAppSelector((state) => state.auth.ttd)

  const dispatch = useAppDispatch()

  const [timer, setTimer] = useState(0)
  const [ttl, setTtl] = useState(3600)
  //====================================++++++++++++++++++++++++++++++++++++++
  const limit = 30

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev += 1))
    }, 8000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    const ttl = (ttd - +new Date().getTime()) / 1000
    console.log('🚀 ~ file: App.tsx:157 ~ useEffect ~ ttl', ttl)
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
}

export default function App() {
  return (
    <>
      <StatusBar style='auto' />
      <Provider store={store}>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </Provider>
    </>
  )
}
