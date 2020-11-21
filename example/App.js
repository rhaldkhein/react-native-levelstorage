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
  { id: 'string_a', key: 'key_string_a', value: 'value_string_a' },
  { id: 'string_b', key: 'key_string_b', value: 'value_string_b' }
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
