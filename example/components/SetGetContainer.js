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
import SetGetRemove from './SetGetRemove'
import storage from '../dist/levelstorage'
import { Buffer } from 'buffer'

const bufferStorage = storage.create('buffer', true)

const data = [
  { id: 'string_a', key: 'setget_a', value: 'setget_value_a' },
  { id: 'string_b', key: 'setget_b', value: 'setget_value_b' },
  { id: 'number', key: 123, value: 'setget_value_number' }
]

const SetGetContainer = () => {
  return (
    <View testID="setget_container">
      {
        data.map(item => {
          return <View key={item.id}>
            <SetGetRemove
              storage={storage}
              itemValue={item.value}
              itemKey={item.key}
              id={item.id}
              promise={true} />
          </View>
        })
      }
      <View>
        <SetGetRemove
          storage={bufferStorage}
          itemValue={Buffer.from([1, 2, 3])}
          itemKey={'buffer_key'}
          id={'buffer'}
          promise={true} />
      </View>
    </View>
  );
};

export default SetGetContainer;
