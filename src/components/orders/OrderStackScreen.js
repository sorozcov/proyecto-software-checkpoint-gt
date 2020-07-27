import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { withTheme } from 'react-native-paper';

import OrdersList from '../../components/orders/OrdersList';


const OrderStack = createStackNavigator();

function OrderStackScreen({ theme }) {
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
            <OrderStack.Screen name="NewOrder" options={{ title: 'PEDIDOS', headerTitleAlign: 'center'}} component={OrdersList} />
        </OrderStack.Navigator>
    );
};

export default withTheme(OrderStackScreen);