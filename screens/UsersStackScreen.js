import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { withTheme } from 'react-native-paper';

import UserList from '../components/UserList';
import EditUserScreen from './EditUserScreen';

const UsersStack = createStackNavigator();

function UsersStackScreen({ theme }) {
  const { colors } = theme;
  return (
    <UsersStack.Navigator screenOptions={({ route }) => 
      ({
        headerBackTitleVisible:false,
        headerTitleStyle: {
          fontFamily: 'dosis-bold',          
        },
        headerMode: 'screen'
      })} initialRouteName="UserList">
      <UsersStack.Screen name="UserList" options={{ title: 'USUARIOS', headerTitleAlign:'center'}} component={UserList} />
      <UsersStack.Screen name="EditUserScreen"   options={{ title: 'NUEVO USUARIO', headerTitleAlign:'center'}} component={EditUserScreen} />
    </UsersStack.Navigator>
  );
}

export default withTheme(UsersStackScreen);
