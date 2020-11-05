/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

// eslint-disable-next-line no-use-before-define
import React from 'react'
import {
  AppRegistry,
  View
} from 'react-native'
import SetGetRemove from './components/SetGetRemove'
import { Buffer } from 'buffer'

const data = [
  { id: 'string', key: 'key_string', value: 'value_string' },
  { id: 'number', key: 123, value: 456 },
  { id: 'buffer', key: Buffer.from([1, 2, 3]), value: Buffer.from([1, 2, 3]) }
]

function Example() {
  return <View testID='root'>
    {
      data.map(item => {
        return <View key={item.id}>
          <SetGetRemove
            itemValue={item.value}
            itemKey={item.key}
            id={item.id}
            promise={true} />
          <SetGetRemove
            itemValue={item.value}
            itemKey={item.key}
            id={item.id}
            promise={false} />
        </View>
      })
    }

  </View>
}

AppRegistry.registerComponent('example', () => Example)
