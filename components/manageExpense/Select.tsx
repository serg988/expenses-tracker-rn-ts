import { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { COLORS } from '../../constants/styles'
import useColor from '../../hooks/useColor'
import { SelectList } from 'react-native-dropdown-select-list'
import { catArray, CatArrayType } from '../../constants/categories'
import { PeriodArrayType } from '../../constants/periods'

interface Props {
  onSelect: (selected: string) => void
  data: { key: string; value: string }[]
  defaultOption: { key: string; value: string }
}

function Select({ onSelect, data, defaultOption }: Props) {
  const themeId = useColor()
  const [selected, setSelected] = useState('')

  return (
    <View>
      <SelectList
        onSelect={() => onSelect(selected)}
        setSelected={(val: string) => setSelected(val)}
        data={data}
        save='value'
        search={false}
        boxStyles={{
          borderRadius: 8,
          marginHorizontal: 8,
          marginTop: 10,
          backgroundColor: COLORS(themeId).primary100,
        }}
        inputStyles={{
          color: COLORS(themeId).primary700,
          fontSize: 18,
        }}
        dropdownTextStyles={{
          color: COLORS(themeId).primary500,
          backgroundColor: COLORS(themeId).primary50,
          marginHorizontal: 8,
          padding: 8,
          borderRadius: 8,
        }}
        defaultOption={defaultOption}
      />
    </View>
  )
}

export default Select

const styles = StyleSheet.create({})
