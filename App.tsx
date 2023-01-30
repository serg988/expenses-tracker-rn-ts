import { NavigationContainer } from '@react-navigation/native'
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
import { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { authenticate } from './store/authSlice'

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: GlobalStyles.colors.primary100 },
      }}
    >
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Signup' component={SignupScreen} />
    </Stack.Navigator>
  )
}

function ExpensesOverview() {
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

function Root() {
  const token = useAppSelector((state) => state.auth.token)
  const dispatch = useAppDispatch()
  useEffect(() => {
    async function getToken() {
      const storedToken = await AsyncStorage.getItem('token')
      if (storedToken) {
        dispatch(authenticate(storedToken))
      }

    }
    getToken()
  }, [])

  return (
    <NavigationContainer>
      {!token ? <AuthStack /> : <MainNavigation />}
    </NavigationContainer>
  )
}

export default function App() {
  return (
    <>
      <StatusBar style='auto' />

      <Provider store={store}>
        <Root />
      </Provider>
    </>
  )
}
