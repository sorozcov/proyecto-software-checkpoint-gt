import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { withTheme } from 'react-native-paper';
import OrdersList from '../../components/orders/OrdersList';
import ProductsList from './ProductsList';
import FinishOrder from './FinishOrder';


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
            <OrdersStack.Screen
                name="ProductSelect"
                options={{
                    title: 'PEDIDO',
                    headerTitleAlign:'center'
                }}
                component={ProductsList}
            />
            <OrdersStack.Screen
                name="FinishOrder"
                options={{
                    title: 'OVERVIEW',
                    headerTitleAlign:'center'
                }}
                component={FinishOrder}
            />

		</OrdersStack.Navigator>
	);
}

export default withTheme(OrdersStackScreen); 
