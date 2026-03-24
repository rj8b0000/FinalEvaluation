import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GlobalStyles } from '../../style';

const LoginScreen = () => {
  return (
    <SafeAreaView style={GlobalStyles.container}>
      <Text>LoginScreen</Text>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
