import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { withTheme } from 'react-native-paper';
import CategoriesList from '../categories/CategoriesList';
import EditCategoryScreen from '../categories/EditCategoryScreen';
import EditProductScreen from '../products/EditProductScreen';
import ProductListScreen from '../products/ProductsList';


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
      })} initialRouteName="Menu">
      <MenuStack.Screen name="Menu" options={{ title: 'MENU', headerTitleAlign:'center'}} component={ProductListScreen} />
      <MenuStack.Screen name="CategoriesList" options={{ title: 'CATEGORÍAS', headerTitleAlign:'center'}} component={CategoriesList} />
      <MenuStack.Screen name="EditProductScreen"   options={{ title: 'NUEVO PRODUCTO', headerTitleAlign:'center'}} component={EditProductScreen} />
      <MenuStack.Screen name="EditCategoryScreen"   options={{ title: 'NUEVA CATEGORÍA', headerTitleAlign:'center'}} component={EditCategoryScreen} />
    </MenuStack.Navigator>
  );
}

export default withTheme(MenuStackScreen);
