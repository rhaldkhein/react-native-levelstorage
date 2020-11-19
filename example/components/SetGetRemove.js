// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react'
import {
  View,
  Text,
  Button
} from 'react-native'
import storage from '../dist'
import { Buffer } from 'buffer'

function SetGetRemove({ id, itemKey, itemValue, promise }) {
  const testId = id + (promise ? '_promise' : '_callback')
  const [value, setValue] = useState()
  const clickSetGet = promise
    ? async () => {
      await storage.setItem(itemKey, itemValue)
      const value = await storage.getItem(itemKey, id === 'buffer')
      setValue(value)
    }
    : () => {
      storage.setItem(itemKey, itemValue, err => {
        if (err) return
        storage.getItem(itemKey, id === 'buffer', (err, value) => {
          if (err) return
          setValue(value)
        })
      })
    }
  const clickRemove = promise
    ? async () => {
      await storage.removeItem(itemKey)
      const value = await storage.getItem(itemKey)
      setValue(value)
    }
    : () => {
      storage.removeItem(itemKey, err => {
        if (err) return
        storage.getItem(itemKey, (err, value) => {
          if (err) return
          setValue(value)
        })
      })
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
        {
          value === null ?
            'null' :
            (Buffer.isBuffer(value) ? value.toString('base64') : value)
        }
      </Text>
    </View>
  )
}

export default SetGetRemove
