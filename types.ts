import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import type {
  CompositeNavigationProp,
  RouteProp,
} from '@react-navigation/native'
import { CatArrayType } from './constants/categories'

export type RootStackParamList = {
  ManageExpense: undefined
  ExpensesOverview: BottomTabNavigatorParamList
}

export type BottomTabNavigatorParamList = {
  RecentExpenses: undefined
  AllExpenses: undefined
}

// export type DetailsScreenRouteProp = RouteProp<
//   HomeStackNavigatorParamList,
//   'Details'
// >

// export type HomeStackNavigatorParamList = {
//   Home: undefined
//   Details: {
//     name: string
//     birthYear: string
//   }
// }

// export type HomeScreenNavigationProp = CompositeNavigationProp<
//   NativeStackNavigationProp<HomeStackNavigatorParamList, 'Details'>,
//   BottomTabNavigationProp<BottomTabNavigatorParamList, 'Feed'>
// >

// export type BottomTabNavigatorParamList = {
//   HomeStack: HomeStackNavigatorParamList
//   Feed: undefined
//   Settings: undefined
// }

// type Categories = 'meals'

export type Expense = {
  id?: string
  category: CatArrayType
  description: string
  amount: number
  date: Date
}

export type CredentialsSignup = {
  email: string
  confirmEmail: string
  password: string
  confirmPassword: string
  rememberCredentials: boolean
}

export type CredentialsLogin = {
  email: string
  password: string
}


// https://max-rn-app-default-rtdb.europe-west1.firebasedatabase.app/
