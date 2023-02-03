import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

//@ts-ignore
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getAsyncStorageData } from '../util/auth'

import { Ionicons } from '@expo/vector-icons'

type initialState = {
  fontSize: 'small' | 'normal' | 'large'
}

const initialState: initialState = {
  fontSize: 'normal'
}


//<+><-><+><-><+><-><+><-><+><-><+><-><+><-><+><-><+><-><+><-><+><-><+><->
const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    //--------------------FONT SIZE-------------------

    changeSize(state, action) {
      state.fontSize = action.payload
    },

   
  },
  //<+><-><+><-><+><-><+><-><+><-><+><-><+><-><+><-><+><-><+><-><+><-><+><->
  
  },
)

export default settingsSlice.reducer
export const { changeSize } = settingsSlice.actions
