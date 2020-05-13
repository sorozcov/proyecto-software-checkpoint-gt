import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { withTheme } from 'react-native-paper';

import CategoriesList from '../components/CategoriesList';
import EditCategoryScreen from './EditCategoryScreen';
import * as actions from '../src/actions/categories';

const MenuStack = createStackNavigator();


function MenuStackScreen({ theme }) {
  const { colors } = theme;
  return (
    <MenuStack.Navigator screenOptions={({ route }) => 
      ({
        headerBackTitleVisible:false,
        headerTitleStyle: {
          fontFamily: 'dosis-bold',          
        },
        headerMode: 'screen'
      })} initialRouteName="CategoriesList">
      <MenuStack.Screen name="CategoriesList" options={{ title: 'MENU', headerTitleAlign:'center'}} component={CategoriesList} />
      <MenuStack.Screen name="EditCategoryScreen"   options={{ title: 'NUEVA CATEGORÍA', headerTitleAlign:'center'}} component={EditCategoryScreen} />
    </MenuStack.Navigator>
  );
}

export default withTheme(MenuStackScreen);
