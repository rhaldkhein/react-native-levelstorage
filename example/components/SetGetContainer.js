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

const data = [
  { id: 'string_a', key: 'setget_a', value: 'setget_value_a' },
  { id: 'string_b', key: 'setget_b', value: 'setget_value_b' }
]

const SetGetContainer = () => {
  return (
    <View testID="setget_container">
      {
        data.map(item => {
          return <View key={item.id}>
            <SetGetRemove
              itemValue={item.value}
              itemKey={item.key}
              id={item.id}
              promise={true} />
          </View>
        })
      }
    </View>
  );
};

export default SetGetContainer;
