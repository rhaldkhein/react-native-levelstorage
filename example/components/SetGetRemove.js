// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react'
import {
  View,
  Button,
  Text
} from 'react-native'
// import storage from '../dist'
import RNLeveldown from 'react-native-leveldown'
import LevelUp from 'levelup'

const db = LevelUp(new RNLeveldown(name))
db.put('hello', 'world')

function SetGetRemove({ id, itemKey, itemValue, promise }) {
  id = id + (promise ? '_promise' : '_callback')
  // const [value, setValue] = useState()
  // const clickSetGet = promise
  //   ? async () => {
  //       await storage.setItem(itemKey, itemValue)
  //       const value = await storage.getItem(itemKey)
  //       setValue(value)
  //     }
  //   : () => {
  //       storage.setItem(itemKey, itemValue, err => {
  //         if (err) return
  //         storage.getItem(itemKey, (err, value) => {
  //           if (err) return
  //           setValue(value)
  //         })
  //       })
  //     }
  // const clickRemove = promise
  //   ? async () => {
  //       await storage.removeItem(itemKey)
  //       const value = await storage.getItem(itemKey)
  //       setValue(value)
  //     }
  //   : () => {
  //       storage.removeItem(itemKey, err => {
  //         if (err) return
  //         storage.getItem(itemKey, (err, value) => {
  //           if (err) return
  //           setValue(value)
  //         })
  //       })
  //     }

  return (
    <View>
      {/* <Button
        testID={id + '_setget'}
        onPress={clickSetGet}
        title={id + '_setget'} />
      <Button
        testID={id + '_remove'}
        onPress={clickRemove}
        title={id + '_remove'} />
      <Text testID={id + '_value'}>
        {value === null ? 'null' : value}
      </Text> */}
      <Text>Foo</Text>
    </View>
  )
}

export default SetGetRemove
