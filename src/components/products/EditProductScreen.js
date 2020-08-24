import React, { useEffect, useState } from 'react';
import 'firebase/firestore';
import { Text } from 'native-base';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Divider } from 'react-native-elements';
import { Button, withTheme } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAvoidingView, StyleSheet, View, FlatList, Modal } from 'react-native';
import omit from 'lodash/omit';

import MyCheckbox from '../general/checkbox';
import ModalIngrediens from './ModalIngrediens';
import * as selectors from '../../logic/reducers';
import MyTextInput from '../../components/general/textInput';
import PickerInput from '../../components/general/PickerInput';
import * as actionsProducts from '../../logic/actions/products';
import ImagePicker from '../../components/general/ImagePickerProduct';



function EditProductScreen({ theme, navigation, dirty, valid, handleSubmit, initialValues, clearProduct, createProduct, editProduct, addIngredient, addIngredientNewProduct, categories, savedIngredients, savedAdditionals, ingredients, additionals, changeIngredientDefault, changeAdditionalDefault }) {
	const { colors, roundness } = theme;
	
	const isNew = initialValues == null;

	useEffect(clearProduct, []);
	
	const [modal, setModal] = useState(false);
	
	if(!isNew)
	navigation.setOptions({ title: 'EDITAR PRODUCTO' });
	
	const editProductForm = values => {
		var selectedCategory = categories.filter(category => category.categoryId == values.category[0])[0];
		values.category = selectedCategory;
		values.categoryId = selectedCategory.categoryId;
		if(isNew){
			createProduct(navigation, values)
		} else {
			editProduct(navigation,values)
		}
	}
	
	const addAdditionalIngredient = values => {
		isNew ? addIngredientNewProduct(values) : addIngredient(values)
	}
	
	return (
		<KeyboardAvoidingView
			behavior={Platform.OS == "ios" ? "padding" : "height"}
			style={styles.container}
		>
		<View style={styles.container}>
			<ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
				<View style={styles.formContainer}>
					<Field name={'image'} component={ImagePicker} image={isNew ? null : initialValues.image}/>
					<Field name={'productName'} component={MyTextInput} label='Nombre' placeholder='Ingresa el nombre del producto'/>
					<Field name={'description'} component={MyTextInput} label='Descripción' placeholder='Ingresa la descripción del producto'  multiline={true}/>
					<Field name={'price'} component={MyTextInput} label='Precio' placeholder='Ingresa el precio que tendrá el producto' keyboardType='numeric'/>
					<Field name={'category'} component={PickerInput} title='Categoría' single={true} selectedText="Categoría" placeholderText="Seleccionar una categoría" 
						options={categories.map(category => ({ value: category.categoryId, label: category.categoryName }))}
						selectedItems={!isNew?[initialValues.categoryId]:[]}/>
					<Field name={'status'} component={MyCheckbox} label='ACTIVO' containerStyle={{backgroundColor:null,width:'50%',alignSelf:'center'}} center={true} checked={!isNew?initialValues.status:true}/>
					<Divider style={{ backgroundColor: 'red', marginTop: 20, marginBottom: 20 }} />
					<Text style={{ paddingLeft: 10, fontFamily: 'dosis-light', fontSize: 18, marginBottom: 20}}>
						{'Ingredientes'}  
					</Text>
					<FlatList
						data={isNew ? savedIngredients.map((ingredient, i) => ({...ingredient, id: i})) : ingredients.map((ingredient, i) => ({...ingredient, id: i}))}
						renderItem={({item}) => <Field name={item.name} component={MyCheckbox} label={item.name} functionCheckbox={()=>changeIngredientDefault(isNew, item.id)} containerStyle={{backgroundColor: null, width: '80%', alignSelf: 'center'}} center={true} checked={item.default}/>}
					/>
					<Divider style={{ backgroundColor: 'red', marginTop: 20, marginBottom: 20 }} />
					<Text style={{ paddingLeft: 10, fontFamily: 'dosis-light', fontSize: 18, marginBottom: 20}}>
						{'Adicionales'}  
					</Text>
					<FlatList
						data={isNew ? savedAdditionals.map((ingredient, i) => ({ ...ingredient, id: i })) : additionals.map((ingredient, i) => ({ ...ingredient, id: i }))}
						renderItem={({item}) => <Field name={item.name} component={MyCheckbox} label={`${item.name} (Q${item.cost})`} functionCheckbox={()=>changeAdditionalDefault(isNew, item.id)} containerStyle={{backgroundColor: null, width: '80%', alignSelf: 'center', justifyContent: 'center'}} center={true} checked={item.default} />}
					/>
					<Divider style={{ backgroundColor: 'red', marginTop: 20, marginBottom: 20 }} />
					<View style={{ marginTop: 8, marginBottom: 8 }}>
						<Button
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
								marginVertical: 16,
								justifyContent: 'center',
								flex: 1
							}}
							onPress={()=>setModal(true)}
						>
						{'Nuevo Ingrediente'}
						</Button>
					</View>
					<View style={{marginTop:'4%',marginBottom:'10%'}}>
					<Button
						disabled={!(dirty && valid)}
						theme={roundness}
						color={'#000000'}
						icon={isNew ? "plus" : "pencil"}
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
							justifyContent: 'center',
						}}
						onPress={handleSubmit(editProductForm)}>
						{isNew ? 'CREAR PRODUCTO' : 'EDITAR PRODUCTO'}
						</Button>
					</View>
				</View>
			</ScrollView>
		</View>
		<ModalIngrediens modal={modal} closeModal={()=>setModal(false)} submitFunction={(values)=>addAdditionalIngredient(values)} />
		</KeyboardAvoidingView>
	);
}
	
const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#fff',
		fontFamily: 'dosis-regular',
	},
	contentContainer: {
		paddingTop: 30,
	},
	inputContainerStyle: {
		margin: 8,
	},
	inputContainerStyle: {
		paddingLeft: 20,
		paddingBottom: 10,
		paddingRight: 20,
	},
	titleStyle: {
		textAlign: 'center',
		fontFamily: 'dosis-extra-bold',
		fontSize: 30,
		paddingBottom: '6%',
		paddingTop: '8%',
	},
	textStyle:{
		textAlign: 'center', 
		fontFamily: 'dosis-semi-bold',
		fontSize: 16,
		paddingTop: 20,
		paddingBottom: 20,
	},
});

export default connect(
	state => ({
		initialValues: selectors.getSelectedProduct(state),
		ingredients: selectors.getSelectedProductIngredients(state),
		additionals: selectors.getSelectedProductAdditionals(state),
		savedIngredients: selectors.getSavedIngredients(state),
		savedAdditionals: selectors.getSavedAdditionals(state),
		categories: selectors.getCategories(state),
	}),
	dispatch => ({
		clearProduct() {
            dispatch(actionsProducts.clearNewIngredients());
            dispatch(actionsProducts.clearNewAdditionals());
		},
		createProduct(navigation, values) {
			const product = omit(values, ['additional', 'additionalCost'])
			dispatch(actionsProducts.startAddingProduct(product));
			navigation.navigate('Menu');
		},
		editProduct(navigation, product) {
			dispatch(actionsProducts.startEditingProduct(product));
			navigation.navigate('Menu');
		},
		addIngredient(values) {
			if (!isNaN(parseInt(values.additionalCost)) && values.additionalCost>0) {
				const additionalInfo = {
					name: values.additional,
					default: false,
					cost: parseFloat(values.additionalCost).toFixed(2),
				}
				dispatch(actionsProducts.startAddingIngredient({additionalInfo}))
			}else{
				const ingredientInfo = {
					name: values.additional,
					default: true
				}
				dispatch(actionsProducts.startAddingIngredient({ingredientInfo}))
			};
		},
		addIngredientNewProduct(values) {
			if (!isNaN(parseInt(values.additionalCost)) && values.additionalCost>0) {
				const additionalInfo = {
					name: values.additional,
					default: false,
					cost: parseFloat(values.additionalCost).toFixed(2),
				}
				dispatch(actionsProducts.saveNewAdditional(additionalInfo))
			}else{
				const ingredientInfo = {
					name: values.additional,
					default: true,
				}
				dispatch(actionsProducts.saveNewIngredient(ingredientInfo))
			};
		},
		changeIngredientDefault(isNew, ingredientId) {
			if (isNew) {
				dispatch(actionsProducts.editNewIngredient(ingredientId))
			}else{
				dispatch(actionsProducts.startEditingIngredient({ingredientId}))
			};
		},
		changeAdditionalDefault(isNew, additionalId) {
			if (isNew) {
				dispatch(actionsProducts.editNewAdditional(additionalId))
			}else{
				dispatch(actionsProducts.startEditingIngredient({additionalId}))
			};
		},
	}),
)(reduxForm({
	form: 'editProductForm',
	enableReinitialize : true,
	validate: (values) => {
		const errors = {};
		errors.productName = !values.productName ? 'Este campo es obligatorio' : undefined;
		errors.description = !values.description ? 'Este campo es obligatorio' : undefined;
		errors.category = values.category && values.category.length === 0 ? 'Este campo es obligatorio' : undefined;
		errors.price = !values.price ? 'Este campo es obligatorio' : isNaN(parseInt(values.price)) ? 'Ingresa un número correcto' : undefined;
		return errors;
	}
})(withTheme(EditProductScreen)));