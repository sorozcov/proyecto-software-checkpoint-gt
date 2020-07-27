import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { withTheme } from 'react-native-paper';
import FinishOrder from '../../components/orders/FinishOrder';
import NewOrder from '../../components/orders/NewOrder';
import SelectProducts from '../../components/orders/SelectProducts';


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
            <OrderStack.Screen name="NewOrder" options={{ title: 'NUEVO PEDIDO', headerTitleAlign: 'center'}} component={NewOrder} />
            <OrderStack.Screen name="ProductSelect"   options={{ title: 'PEDIDO', headerTitleAlign:'center'}} component={SelectProducts} />
            <OrderStack.Screen name="FinishOrder"   options={{ title: 'OVERVIEW', headerTitleAlign:'center'}} component={FinishOrder} />
        </OrderStack.Navigator>
    );
};

export default withTheme(OrderStackScreen);