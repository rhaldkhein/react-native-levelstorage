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
  Text
} from 'react-native';
import SetGetContainer from './components/SetGetContainer'
import FilterContainer from './components/FilterContainer'
import ForEachContainer from './components/ForEachContainer'
import ClearContainer from './components/ClearContainer'
import InstanceContainer from './components/InstanceContainer'

const App = () => {
  return (
    <View testID="root">
      <Text>LevelStorage Test</Text>
      <SetGetContainer />
      <InstanceContainer />
      <ClearContainer />
      <FilterContainer />
      <ForEachContainer />
    </View>
  );
};

export default App;
