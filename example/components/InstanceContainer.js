// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react'
import {
  View,
  Text,
  Button
} from 'react-native'
import storage from '../dist/levelstorage'

const data = [
  { key: 'instance', value: 'instance_value' }
]

function InstanceContainer() {

  const [value, setValue] = useState(null)
  const testId = 'instance'

  const clickButton = async () => {
    const newStorage = storage.create('new_instance')
    await Promise.all(data.map(item => newStorage.setItem(item.key, item.value)))
    const len = await newStorage.length
    setValue(len) // shoud be 1
  }

  return (
    <View testID="instance_container">
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

export default InstanceContainer
