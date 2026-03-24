import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import RootNavigator from './src/navigator/RootNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaProvider>
      <RootNavigator />
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
