// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react'
import {
  View,
  Text,
  Button
} from 'react-native'
import storage from '../dist'

const data = [
  { key: 'clear', value: 'clear_value' }
]

function ClearContainer() {

  const [value, setValue] = useState(-1)
  const testId = 'clear'

  const clickButton = async () => {
    await Promise.all(data.map(item => storage.setItem(item.key, item.value)))
    await storage.clear()
    const len = await storage.length
    setValue(len) // shoud be 0
  }

  return (
    <View testID="clear_container">
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

export default ClearContainer
