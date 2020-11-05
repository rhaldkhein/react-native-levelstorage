/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

// eslint-disable-next-line no-use-before-define
import React from 'react'
import {
  AppRegistry,
  View,
  Text
} from 'react-native'

function Example() {
  return <View testID='welcome'>
    <Text>Example</Text>
  </View>
}

AppRegistry.registerComponent('example', () => Example)
