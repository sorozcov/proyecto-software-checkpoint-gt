import React from 'react';
import { withTheme } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';

import ReportScreen from './ReportScreen';
import DashboardScreen from './DashboardScreen';
import AverageSalesReport from './AverageSalesReport';
import ReportByBranchScreen from './ReportByBranchScreen';


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
            initialRouteName="Dashboard"
        >
            <ReportsStack.Screen
                name="Dashboard"
                options={{ title: 'DASHBOARD', headerTitleAlign:'center'}}
                component={DashboardScreen}
            />
            <ReportsStack.Screen
                name="ReportsByDay"
                options={{ title: 'REPORTE DE VENTAS', headerTitleAlign:'center'}}
                component={ReportScreen}
            />
            <ReportsStack.Screen
                name="ReportByBranch"
                options={{ title: 'REPORTE POR SUCURSAL', headerTitleAlign:'center'}}
                component={ReportByBranchScreen}
            />
            <ReportsStack.Screen
                name="ReportsByWeekday"
                options={{ title: 'VENTAS PROMEDIO', headerTitleAlign:'center'}}
                component={AverageSalesReport}
            />
        </ReportsStack.Navigator>
    );
}

export default withTheme(ReportsStackScreen);