import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home/HomeScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import Ionicons from '@react-native-vector-icons/ionicons';
import { MainTabParamList } from './types';
import TodoScreen from '../screens/Todo/TodoScreen';

const MainTabNavigator = () => {
  const Tab = createBottomTabNavigator<MainTabParamList>();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused }) => {
          switch (route.name) {
            case 'Home':
              return focused ? (
                <Ionicons name="home" size={26} color="#000" />
              ) : (
                <Ionicons name="home-outline" size={26} color="#000" />
              );
            case 'Settings':
              return focused ? (
                <Ionicons name="settings" size={26} color="#000" />
              ) : (
                <Ionicons name="settings-outline" size={26} color="#000" />
              );

            case 'Todo':
              return focused ? (
                <Ionicons name="list" size={26} color="#000" />
              ) : (
                <Ionicons name="list-outline" size={26} color="#000" />
              );
          }
        },
        tabBarStyle: {
          height: 80,
          paddingTop: 10,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="Todo" component={TodoScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
