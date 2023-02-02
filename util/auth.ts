import AsyncStorage from '@react-native-async-storage/async-storage'

export const getAsyncStorageData = async (keys: string[]) => {
  try {
    const data = await AsyncStorage.multiGet(keys)
    if (data !== null) {
      return data
    }
  } catch (error) {
    console.log(error)
  }
}

