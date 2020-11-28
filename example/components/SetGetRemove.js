// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react'
import {
  View,
  Text,
  Button
} from 'react-native'
import { Buffer } from 'buffer'

function SetGetRemove({ id, itemKey, itemValue, storage }) {
  const testId = id
  const [value, setValue] = useState()
  const clickSetGet = async () => {
    await storage.setItem(itemKey, itemValue)
    const value = await storage.getItem(itemKey)
    setValue(value)
  }
  const clickRemove = async () => {
    await storage.removeItem(itemKey)
    const value = await storage.getItem(itemKey)
    setValue(value)
  }

  return (
    <View>
      <Button
        testID={testId + '_setget'}
        onPress={clickSetGet}
        title={testId + '_setget'} />
      <Button
        testID={testId + '_remove'}
        onPress={clickRemove}
        title={testId + '_remove'} />
      <Text testID={testId + '_value'}>
        {value === null ? 'null' : (
          Buffer.isBuffer(value) ? value.toString('base64') : value
        )}
      </Text>
    </View>
  )
}

export default SetGetRemove
