// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react'
import {
  View,
  Text,
  Button
} from 'react-native'
import storage from '../dist/levelstorage'

const data = [
  { key: 'foreach_alpha', value: 'alpha' },
  { key: 'foreach_bravo', value: 'bravo' },
  { key: 'foreach_charlie', value: 'charlie' }
]

function ForEachContainer() {

  const [value, setValue] = useState(null)
  const testId = 'foreach'

  const clickButton = async () => {
    await storage.clear()
    await Promise.all(data.map(item => storage.setItem(item.key, item.value)))
    let str = ''
    await storage.forEach(v => {
      str += v
    })
    setValue(str) // shoud be alphabravocharlie
  }

  return (
    <View testID="foreach_container">
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

export default ForEachContainer
