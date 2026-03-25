import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import RootNavigator from './src/navigator/RootNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/context/ThemeContext';
import { Provider } from 'react-redux';
import { todoStore } from './src/redux/todoStore';

const App = () => {
  return (
    <ThemeProvider>
      <Provider store={todoStore}>
        <SafeAreaProvider>
          <RootNavigator />
        </SafeAreaProvider>
      </Provider>
    </ThemeProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
