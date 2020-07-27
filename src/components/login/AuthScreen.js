import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import HomeScreen from '../home/HomeScreenAdmin';
import HomeScreenWaiters from '../home/HomeScreenWaiters';
import LoginScreen from '../login/LoginScreen';




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