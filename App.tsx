import 'react-native-gesture-handler'
import {
  NavigationContainer,
  useNavigation,
  useNavigationContainerRef,
} from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer'
import ManageExpense from './screens/expenses/ManageExpense'
import RecentExpenses from './screens/expenses/RecentExpenses'
import AllExpenses from './screens/expenses/AllExpenses'
import { BottomTabNavigatorParamList, RootStackParamList } from './types'
import { COLORS } from './constants/styles'

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
import Logout from './screens/auth/Logout'

const Stack = createNativeStackNavigator<any>()
const BottomTabs = createBottomTabNavigator<BottomTabNavigatorParamList>()
const Drawer = createDrawerNavigator<any>()

export function DrawerNavigation() {
  const navigation = useNavigation()
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS().primary500,
        },
        headerTintColor: '#fff',
        sceneContainerStyle: {
          backgroundColor: COLORS().primary500,
        },
        drawerContentStyle: {
          backgroundColor: COLORS().primary500,
        },
        drawerInactiveTintColor: '#fff',
        drawerActiveTintColor: COLORS().primary50,
        drawerActiveBackgroundColor: COLORS().primary500,
      }}
      // drawerContent={(props) => {
      //   return (
      //     <DrawerContentScrollView {...props}>
      //       <DrawerItemList {...props}

      //       />
      //       <DrawerItem
      //         label='Logout'
      //         onPress={() => dispatch(logout())}

      //       />
      //     </DrawerContentScrollView>
      //   )
      // }}
    >
      <Drawer.Screen
        name='Expenses Overview'
        component={MainNavigation}
        options={{
          headerShown: false,
          title: 'All Expenses',
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name='cash'
              size={size}
              color={focused ? COLORS().accent500 : '#ccc'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name='Settings'
        component={SettingsScreen}
        options={{
          title: 'Settings',
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name='settings'
              size={size}
              color={focused ? COLORS().accent500 : '#ccc'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name='Logout'
        component={Logout}
        options={{
          title: 'Logout',
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name='exit'
              size={size}
              color={focused ? COLORS().accent500 : '#ccc'}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  )
}

//------------------AUTH STACK-------------------------------------

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS().primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: COLORS().primary100 },
      }}
    >
      <Stack.Screen name='Login' component={LoginScreen} />
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
        headerShown: true,
        headerStyle: {
          backgroundColor: COLORS().primary500,
        },
        headerTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: COLORS().primary500,
        },
        tabBarActiveTintColor: COLORS().accent500,
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
            icon='menu'
            size={24}
            color={tintColor || 'white'}
            onPress={() => navigation.openDrawer()}
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
  const navigation = useNavigation()
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS().primary500,
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
    }, 3000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    const ttl = (ttd - +new Date().getTime()) / 1000
    // console.log('🚀 ~ file: App.tsx:157 ~ useEffect ~ ttl', ttl)
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
