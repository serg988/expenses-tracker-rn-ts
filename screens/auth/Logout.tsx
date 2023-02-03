import { useEffect } from 'react'
import { View, Text } from 'react-native'
import { logout } from '../../store/authSlice'
import { useAppDispatch } from '../../store/hooks'

function Logout() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(logout())
  }, [])
  return (
    <View>
      <Text></Text>
    </View>
  )
}

export default Logout
