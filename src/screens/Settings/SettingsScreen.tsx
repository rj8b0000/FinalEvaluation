import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { logout } from '../../services/auth';

const SettingsScreen = () => {
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      Alert.alert('Error');
      console.log(error);
    }
  };
  return (
    <View>
      <Text>SettingsScreen</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({});
