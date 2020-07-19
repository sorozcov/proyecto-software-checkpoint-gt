import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { withTheme } from 'react-native-paper';

import BranchesList from '../../components/branches/BranchesList';
import EditBranchScreen from './EditBranchScreen';
import UserList from '../../components/branches/BranchUserList';
import EditUserScreen from '../../components/branches/BranchEditUser';

const BranchesStack = createStackNavigator();

function BranchesStackScreen({ theme }) {
	const { colors } = theme;
	
	return (
		<BranchesStack.Navigator screenOptions={({ route }) =>
		({
			headerBackTitleVisible:false,
			headerTitleStyle: {
			fontFamily: 'dosis-bold',  
			},
			headerMode: 'screen'
		})} initialRouteName="BranchesList">
		<BranchesStack.Screen
			name="BranchesList"
			options={{ title: 'SUCURSALES', headerTitleAlign:'center'}}
			component={BranchesList}
		/>
		<BranchesStack.Screen
			name="EditBranchScreen"
			options={{ title: 'NUEVA SUCURSAL', headerTitleAlign:'center'}}
			component={EditBranchScreen}
		/>
		<BranchesStack.Screen
			name="UserList" 
			options={{
			title: 'USUARIOS',
			}} 
			component={UserList}
		/>
		<BranchesStack.Screen
			name="EditUserScreen"
			options={{
				title: 'NUEVO USUARIO',
			}}
			component={EditUserScreen}
		/>
		</BranchesStack.Navigator>
	);
}

export default withTheme(BranchesStackScreen);
