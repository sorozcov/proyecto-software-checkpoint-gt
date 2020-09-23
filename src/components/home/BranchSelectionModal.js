import React from 'react';
import { connect } from 'react-redux';
import 'firebase/firestore';
import { Field, reduxForm, submit } from 'redux-form';
import { Button, withTheme } from 'react-native-paper';
import { StyleSheet, View, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import MyTextInput from '../general/textInput';

import PickerInput from '../../components/general/PickerInput';

import * as selectors from '../../logic/reducers';
import * as actions from '../../logic/actions/users';

function BranchSelectionModal({
    navigation,
	theme,
	dirty,
	valid,
	handleSubmit,
	closeModal,
	modal,
	initialValues,
	branches
}) {


	const isNew = initialValues == null;

    const { colors, roundness } = theme;
    const editLoggedUserBranchForm = values => {
		closeModal();
		console.log("Values: \n", values);
        values.restaurantName = selectors.getBranch(values.restaurantId).name;
        editLoggedUser(navigation, values);
        values.additionalCost = '';
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

					<Button
						disabled={!dirty}
						theme={roundness}
						color={'#000000'}
						icon={"plus"}
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
						{'Agregar'}
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
							marginTop: 1,
							justifyContent: 'center',
						}}
						onPress={()=>closeModal()}
					>
						{'Cancelar'}
					</Button>
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
            navigation.replace('HomeAdmin');
        }
	}),
)(reduxForm({
	form: 'editLoggedUserBranchForm',
	enableReinitialize : true,
})(withTheme(BranchSelectionModal)));