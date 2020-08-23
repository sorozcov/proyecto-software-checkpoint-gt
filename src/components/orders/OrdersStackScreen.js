import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { withTheme } from 'react-native-paper';
import OrdersList from '../../components/orders/OrdersList';


const OrdersStack = createStackNavigator();

function OrdersStackScreen({ theme }) {
	const { colors } = theme;
	
	return (
        <OrdersStack.Navigator
            screenOptions={ ({ route }) => ({
                headerBackTitleVisible:false,
                headerTitleStyle: {
                fontFamily: 'dosis-bold',  
                },
                headerMode: 'screen'
            })}
            initialRouteName="OrdersList"
        >

            <OrdersStack.Screen
                name="OrdersList"
                options={{ title: 'PEDIDOS', headerTitleAlign:'center'}}
                component={OrdersList}
            />

		</OrdersStack.Navigator>
	);
}

export default withTheme(OrdersStackScreen); 
