import { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { COLORS } from '../../constants/styles'
import useTheme from '../../hooks/useTheme'
import { SelectList } from 'react-native-dropdown-select-list'
import { catArray } from '../../constants/categories'

function Select({ onSelect, value }: any) {
  const themeId = useTheme()
  const [selected, setSelected] = useState('')

  const data = catArray.map((cat) => {
    return { key: cat, value: cat }
  })

  return (
    <View>
      <SelectList
        onSelect={onSelect.bind(null, selected)}
        setSelected={(val: string) => setSelected(val)}
        data={data}
        save='value'
        search={true}
        boxStyles={{
          borderRadius: 8,
          marginHorizontal: 8,
          marginTop: 10,
          backgroundColor: COLORS(themeId).primary100,
        }}
        inputStyles={{
          color: COLORS(themeId).primary700,
          fontSize: 18
        }}
        dropdownTextStyles={{
          color: COLORS(themeId).primary500,
          backgroundColor: COLORS(themeId).primary50,
          marginHorizontal: 8,
          padding: 8,
          borderRadius: 8,
        }}
        defaultOption={
          value
            ? { key: value, value: value }
            : { key: 'Продукты', value: 'Продукты' }
        }
      />
    </View>
  )
}

export default Select

const styles = StyleSheet.create({})
