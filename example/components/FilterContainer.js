// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react'
import {
  View,
  Text,
  Button
} from 'react-native'
import storage from '../dist'

const data = [
  { key: 'filter_alpha', value: 'filter_value_alpha' },
  { key: 'filter_bravo', value: 'filter_value_bravo' },
  { key: 'filter_charlie', value: 'filter_value_charlie' },
  { key: 'filter_nobody', value: 'nofilter_value' },
]

function FilterContainer() {

  const [value, setValue] = useState(null)
  const testId = 'filter'

  const clickButton = async () => {
    await Promise.all(data.map(item => storage.setItem(item.key, item.value)))
    const result = await storage.filter(v => v.startsWith('filter_'))
    setValue(result.length) // shoud be 3
  }

  return (
    <View testID="filter_container">
      <Button
        testID={testId}
        onPress={clickButton}
        title={testId} />
      <Text testID={testId + '_value'}>
        {value === null ? 'null' : value}
      </Text>
    </View>
  )
}

export default FilterContainer
