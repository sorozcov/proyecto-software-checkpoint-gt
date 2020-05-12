import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreenAdmin';
import HomeScreenWaiters from './HomeScreenWaiters';

const Stack = createStackNavigator();

export default function AuthScreen() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="HomeAdmin" component={HomeScreen} />
        <Stack.Screen name="HomeWaiters" component={HomeScreenWaiters} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}