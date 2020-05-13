import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { withTheme } from 'react-native-paper';

import BranchesList from '../../components/branches/BranchesList';
import EditBranchScreen from './EditBranchScreen';

const UsersStack = createStackNavigator();

function BranchesStackScreen({ theme }) {
  const { colors } = theme;
  return (
    <UsersStack.Navigator screenOptions={({ route }) => 
      ({
        headerBackTitleVisible:false,
        headerTitleStyle: {
          fontFamily: 'dosis-bold',          
        },
        headerMode: 'screen'
      })} initialRouteName="BranchesList">
      <UsersStack.Screen name="BranchesList" options={{ title: 'SUCURSALES', headerTitleAlign:'center'}} component={BranchesList} />
      <UsersStack.Screen name="EditBranchScreen" options={{ title: 'NUEVA SUCURSAL', headerTitleAlign:'center'}} component={EditBranchScreen} />
    </UsersStack.Navigator>
  );
}

export default withTheme(BranchesStackScreen);
