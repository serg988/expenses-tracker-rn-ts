import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

//@ts-ignore
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getAsyncStorageData } from '../util/auth'

import { Ionicons } from '@expo/vector-icons'

type initialState = {
  fontSize: 'small' | 'normal' | 'large'
  themeId: 0 | 1 | 2
}

const initialState: initialState = {
  fontSize: 'normal',
  themeId: 1
}


//<+><-><+><-><+><-><+><-><+><-><+><-><+><-><+><-><+><-><+><-><+><-><+><->
const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    //--------------------FONT SIZE-------------------

    setFontSize(state, action) {
      state.fontSize = action.payload
    },
    //--------------------SET THEME-------------------

    setTheme(state, action) {
      state.themeId = action.payload
      AsyncStorage.setItem('colorTheme', action.payload.toString())
    },

   
  },
  //<+><-><+><-><+><-><+><-><+><-><+><-><+><-><+><-><+><-><+><-><+><-><+><->
  
  },
)

export default settingsSlice.reducer
export const { setFontSize, setTheme } = settingsSlice.actions
