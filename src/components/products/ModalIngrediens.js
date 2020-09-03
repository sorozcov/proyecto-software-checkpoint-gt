import React from 'react';
import 'firebase/firestore';
import { Field, reduxForm, submit } from 'redux-form';
import { Button, withTheme } from 'react-native-paper';
import { StyleSheet, View, Modal, ScrollView } from 'react-native';

import MyTextInput from '../../components/general/textInput';


function ModalIngredients({
	theme,
	dirty,
	valid,
	handleSubmit,
	closeModal,
	modal,
	submitFunction
}) {
    const { colors, roundness } = theme;
    const addIngredient = values => {
        closeModal();
        submitFunction(values);
        values.additional = '';
        values.additionalCost = '';
    }
	return (
		<Modal
			transparent={true}
			animationType={'none'}
			visible={modal}
		>
			<View style={styles.modalBackground} >
				<View style={styles.modal}>
				<View style={{justifyContent: 'center'}}>
						<Field name={'additional'} component={MyTextInput} label='Ingrediente' placeholder='Ingrediente'></Field>
						<Field name={'additionalCost'} component={MyTextInput} label='Precio Unitario' placeholder='Precio' keyboardType='numeric'></Field>
					</View>
					<Button
						disabled={!(dirty && valid)}
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
						onPress={handleSubmit(addIngredient)}
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
	modalBackground: {
		flex: 1,
		alignItems: 'center',
		flexDirection: 'column',
		justifyContent: 'space-around',
		
		backgroundColor: '#00000040'
	  },
	  modal: {
		backgroundColor: '#FFFFFF',
		height: 350,
		width: '80%',
		borderRadius: 10,
		marginBottom:200,
		justifyContent: 'space-around'
	  },
});

export default reduxForm({
	form: 'editIngredientsForm',
	enableReinitialize : true,
	validate: (values) => {
		const errors = {};
		errors.additional = !values.additional ? 'Ingrese el nombre del ingrediente' : undefined;
		errors.additionalCost = values.additionalCost && isNaN(parseInt(values.additionalCost)) ? 'Ingrese un número correcto' : undefined;
		return errors;
	}
})(withTheme(ModalIngredients));