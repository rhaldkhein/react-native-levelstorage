/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  View,
} from 'react-native';
import SetGetRemove from './components/SetGetRemove'
import { Buffer } from 'buffer'

const data = [
  { id: 'string', key: 'key_string', value: 'value_string' },
  { id: 'buffer', key: 'key_buffer', value: Buffer.from([1, 2, 3]) }
]

const App = () => {
  return (
    <View testID='root'>
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
  );
};

export default App;
