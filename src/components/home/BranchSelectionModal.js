import React from 'react';
import { connect } from 'react-redux';
import 'firebase/firestore';
import { Field, reduxForm, submit } from 'redux-form';
import { Button, withTheme } from 'react-native-paper';
import { StyleSheet, View, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import MyTextInput from '../general/textInput';
import { suscribeOrders,unsuscribeOrders } from '../../database/firebase/orders';

import PickerInput from '../../components/general/PickerInput';

import * as selectors from '../../logic/reducers';
import * as actions from '../../logic/actions/users';
import * as orderActions from '../../logic/actions/orders';

function BranchSelectionModal({
    navigation,
	theme,
	dirty,
	valid,
	handleSubmit,
	closeModal,
	modal,
	branches,
	initialValues,
	editLoggedUser,
	clearOrders
}) {

	const isNew = initialValues == null;
    const { colors, roundness } = theme;
    const  editLoggedUserBranchForm = async(values) => {
		const selectedBranch = branches.filter(branch => branch.id == values.restaurantId[0])[0];
		values = {...initialValues};
        values.restaurantName = selectedBranch.name;
        values.restaurantId = selectedBranch.id;
		await editLoggedUser(navigation, values);
		await unsuscribeOrders();
		await clearOrders();
		await suscribeOrders({branchId:selectedBranch.id,branchName:selectedBranch.branchName});
		
		closeModal();
	}
	
	return (
		<Modal
			transparent={true}
			animationType={'none'}
			isVisible={modal}
			avoidKeyboard={true}
			coverScreen={true}
			onBackButtonPress={()=>closeModal()}
			style={styles.modalB}
			deviceWidth={Dimensions.get("window").width}
			deviceHeight={Dimensions.get("window").height}
			// onSwipeComplete={()=>closeModal()}
        	// swipeDirection={['down']}
		>
			<View style={styles.modalBackground}>
				<View style={styles.modal}>
					<View style={{justifyContent: 'center'}}>
                        <Field
							name={'restaurantId'}
							component={PickerInput}
							title='Sucursal'
							single={true}
							selectedText="Sucursal"
							placeholderText="Seleccionar una sucursal" 
							options={branches.map(branch => ({
								value: branch.id,
								label: branch.name
							}))}
							selectedItems={!isNew ? [initialValues.restaurantId]:[]}
						/>
					</View>
					<View>
						<Button
							disabled={!dirty}
							theme={roundness}
							color={'#000000'}
							icon={"check"}
							height={50}
							mode="contained"
							labelStyle={{
								fontFamily: "dosis-bold",
								fontSize: 15,
							}}
							style={{
								fontFamily: 'dosis',
								marginLeft: '5%',
								marginRight: '5%',
								justifyContent: 'center'
							}}
							onPress={handleSubmit(editLoggedUserBranchForm)}
						>
							{'Confirmar'}
						</Button>
						
						<Button
							theme={roundness}
							color={'red'}
							height={50}
							mode="contained"
							labelStyle={{
								fontFamily: "dosis-bold",
								fontSize: 15,
							}}
							style={{
								fontFamily: 'dosis',
								marginLeft: '5%',
								marginRight: '5%',
								marginTop: 10,
								justifyContent: 'center',
							}}
							onPress={()=>closeModal()}
						>
							{'Cancelar'}
						</Button>
					</View>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	modalB:{
		flex:1,
		flexDirection: 'row',
		margin: 0
	},
	modalBackground: {
		flex: 1,
		alignItems: 'center',
		flexDirection: 'column',
		justifyContent: 'space-around',
	
	  },
	  modal: {
		backgroundColor: '#FFFFFF',
		height: 350,
		width: '80%',
		borderRadius: 10,
		justifyContent: 'space-around'
	  },
});
	
export default connect(
	state => ({
		initialValues: selectors.getLoggedUser(state),
		branches: selectors.getBranches(state),
	}),

	dispatch => ({
        editLoggedUser (navigation, values) {
			dispatch(actions.startEditingUser(values));
		},
		clearOrders () {
			dispatch(orderActions.clearOrders());
		}
	}),
)(reduxForm({
	form: 'editLoggedUserBranchForm',
	enableReinitialize : true,
})(withTheme(BranchSelectionModal)));