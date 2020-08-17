import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { withTheme } from 'react-native-paper';

import NewOrder from './NewOrder';
import ProductsList from './ProductsList';
import FinishOrder from './FinishOrder';

const OrderStack = createStackNavigator();

function OrderStackScreen({ theme }) {
    console.log("ORDER STACK SCREEN");

    const { colors } = theme;

    return (
        <OrderStack.Navigator screenOptions={({ route }) => 
        ({
            headerBackTitleVisible:false,
            headerTitleStyle: {
                fontFamily: 'dosis-bold',          
            },
            headerMode: 'screen'
        })} initialRouteName="NewOrder">
            <OrderStack.Screen name="NewOrder" options={{ title: 'NUEVO PEDIDO', headerTitleAlign: 'center'}} component={NewOrder} />
            <OrderStack.Screen name="ProductSelect"   options={{ title: 'PEDIDO', headerTitleAlign:'center'}} component={ProductsList} />
            <OrderStack.Screen name="FinishOrder"   options={{ title: 'OVERVIEW', headerTitleAlign:'center'}} component={FinishOrder} />
        </OrderStack.Navigator>
    );
};

export default withTheme(OrderStackScreen);