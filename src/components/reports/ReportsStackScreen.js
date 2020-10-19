import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { withTheme } from 'react-native-paper';
import CategoriesList from '../categories/CategoriesList';
import EditCategoryScreen from '../categories/EditCategoryScreen';
import EditProductScreen from '../products/EditProductScreen';
import ReportScreen from './ReportScreen';


const ReportsStack = createStackNavigator();


function ReportsStackScreen({ theme }) {
    const { colors } = theme;
    return (
        <ReportsStack.Navigator
            screenOptions={({ route }) => ({
                headerBackTitleVisible:false,
                headerTitleStyle: {
                fontFamily: 'dosis-bold',          
                },
                headerMode: 'screen'
            })}
            initialRouteName="Reports"
        >
            <ReportsStack.Screen
                name="Reports"
                options={{ title: 'MENU', headerTitleAlign:'center'}}
                component={ReportScreen}
            />

        </ReportsStack.Navigator>
    );
}

export default withTheme(ReportsStackScreen);