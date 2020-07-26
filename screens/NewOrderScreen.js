import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { withTheme } from 'react-native-paper';

import ProductListScreen from '../components/orders/ProductsList';

const NewOrder = createStackNavigator();


function NewOrderScreen({ theme }) {
  const { colors } = theme;
  return (
    <NewOrder.Navigator screenOptions={({ route }) => 
      ({
        headerBackTitleVisible:false,
        headerTitleStyle: {
          fontFamily: 'dosis-bold',          
        },
        headerMode: 'screen'
      })} initialRouteName="Menu">
      <NewOrder.Screen name="Menu" options={{ title: 'MENU', headerTitleAlign:'center'}} component={ProductListScreen} />
    </NewOrder.Navigator>
  );
}

export default withTheme(NewOrderScreen);