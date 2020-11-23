// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react'
import {
  View,
  Text,
  Button
} from 'react-native'
import storage from '../dist/levelstorage'

const data = [
  { key: 'filter_alpha', value: 'filter_value_alpha' },
  { key: 'filter_bravo', value: 'filter_value_bravo' },
  { key: 'filter_charlie', value: 'filter_value_charlie' },
  { key: 'filter_nobody', value: 'nofilter_value' },
]

function FilterContainer() {

  const [keys, setKeys] = useState(null)
  const [values, setValues] = useState(null)
  const [itemsByKey, setItemsByKey] = useState(null)
  const [itemsByValue, setItemsByValue] = useState(null)
  const testId = 'filter'

  const clickButton = async () => {
    await Promise.all(data.map(item => storage.setItem(item.key, item.value)))
    const resultKeys = await storage.keys()
    const resultValues = await storage.values()
    const filterWithKey = await storage.filter((v, k) => k.indexOf('o') > -1)
    const filterWithValue = await storage.filter(v => v.startsWith('filter_'))
    setKeys(resultKeys.length) // should be 4
    setValues(resultValues.length) // should be 4
    setItemsByKey(filterWithKey.length) // 2
    setItemsByValue(filterWithValue.length) // 3
  }

  return (
    <View testID="filter_container">
      <Button
        testID={testId}
        onPress={clickButton}
        title={testId} />
      <Text testID={testId + '_keys'}>
        {keys === null ? 'null' : keys}
      </Text>
      <Text testID={testId + '_values'}>
        {values === null ? 'null' : values}
      </Text>
      <Text testID={testId + '_itemskey'}>
        {itemsByKey === null ? 'null' : itemsByKey}
      </Text>
      <Text testID={testId + '_itemsvalue'}>
        {itemsByValue === null ? 'null' : itemsByValue}
      </Text>
    </View>
  )
}

export default FilterContainer
