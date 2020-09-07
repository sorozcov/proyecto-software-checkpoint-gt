import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, View, FlatList, Modal, TouchableOpacity } from 'react-native';
import 'firebase/firestore';
import { Text } from 'native-base';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Divider } from 'react-native-elements';
import { Button, withTheme } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

import omit from 'lodash/omit';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import MyCheckbox from '../general/checkbox';
import ModalIngredients from './ModalIngredients';
import ModalAdditional from './ModalAdditional';
import * as selectors from '../../logic/reducers';
import MyTextInput from '../../components/general/textInput';
import PickerInput from '../../components/general/PickerInput';
import * as actionsProducts from '../../logic/actions/products';
import ImagePicker from '../../components/general/ImagePickerProduct';


 
function EditProductScreen({
	theme,
	navigation,
	dirty,
	valid,
	handleSubmit,
	initialValues,
	createProduct,
	editProduct,
	categories,
	ingredients,
	additionals,
	addIngredient,
	addAdditional,
	removeIngredient,
	removeAdditional,
	changeIngredientDefault,
	changeAdditionalDefault
}) {
	const { colors, roundness } = theme;
	
	const isNew = initialValues == null;

	const [ingredientModal, setIngredientModal] = useState(false);
	const [additionalModal, setAdditionalModal] = useState(false);
	
	if(!isNew) {
		navigation.setOptions({title: 'EDITAR PRODUCTO'});
	}
	
	const editProductForm = values => {
		var selectedCategory = categories.filter(category => category.categoryId == values.category[0])[0];
		values.category = selectedCategory;
		values.categoryId = selectedCategory.categoryId;

		if(isNew)
			createProduct(navigation, values);
	 	else {
			editProduct(navigation, values);
		}
	};
	
	// const addAdditionalIngredient = values => {
	// 	isNew ? addIngredientNewProduct(values) : addIngredient(values)
	// };
	
	return (
		<KeyboardAvoidingView
			behavior={Platform.OS == "ios" ? "padding" : "height"}
			style={styles.container}
		>
			<View style={styles.container}>
				<ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
					<View style={styles.formContainer}>
						<Field
							name={'image'}
							component={ImagePicker}
							image={isNew ? null : initialValues.image}
						/>
						<Field
							name={'productName'}
							component={MyTextInput}
							label={'Nombre'}
							placeholder='Ingresa el nombre del producto'
						/>
						<Field
							name={'description'}
							component={MyTextInput}
							label={'Descripción'}
							placeholder='Ingresa la descripción del producto'
							multiline={true}
						/>
						<Field
							name={'price'}
							component={MyTextInput}
							label={'Precio Q.'}
							placeholder='Ingresa el precio que tendrá el producto'
							keyboardType='numeric'
						/>
						<Field
							name={'category'}
							component={PickerInput}
							title='Categoría'
							single={true}
							selectedText="Categoría"
							placeholderText="Seleccionar una categoría" 
							options={categories.map(category => ({
								value: category.categoryId,
								label: category.categoryName
							}))}
							selectedItems={!isNew?[initialValues.categoryId]:[]}
						/>

						{/* Checkbox de activo */}
						<Field
							name={'status'}
							component={MyCheckbox}
							label='ACTIVO'
							containerStyle={{
								backgroundColor:null,
								width:'50%',
								alignSelf:'center'
							}}
							center={true}
							checked={!isNew?initialValues.status:true}
						/>

						<Divider style={styles.contentDivider}/>

						{/* Listado de ingredientes */}
						<Text style={{paddingLeft:10, fontFamily:'dosis-light', fontSize:18, marginBottom:20}}>
							{'Ingredientes'}  
						</Text>

						<View style={{ marginTop: 8, marginBottom: 8 }}>
							<Button
								theme={roundness}
								color={colors.accent }
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
								onPress={()=>setIngredientModal(true)}
							>
							{'Ingrediente'}
							</Button>
						</View>

						<FlatList
							data={isNew ?
								[] :
								ingredients.map((ingredient, i) => ({...ingredient, id: i}))
							}
							renderItem={({item}) => (
								<View style={styles.ingredientView}>
									<View style={{flex:9}}>	
										<Field
											name={item.name}
											component={MyCheckbox}
											label={item.name}
											functionCheckbox={()=>changeIngredientDefault(item.id)}
											containerStyle={{backgroundColor:null, width:'90%', alignSelf:'center'}}
											center={true}
											checked={item.default}
										/>
									</View>
									{/* Botón para eliminar */}
									<TouchableOpacity
										style={[styles.deleteButton]}
										onPress={() => removeIngredient(item.id)}
									>
										<MaterialCommunityIcons
											name="minus"
											color={'red'}
											size={25}
										/>
									</TouchableOpacity>
								</View>
							)}
						/>
						<Divider style={styles.contentDivider}/>

						{/* Listado de adicionales */}
						<Text style={{paddingLeft:10, fontFamily:'dosis-light', fontSize:18, marginBottom:20}}>
							{'Adicionales'}  
						</Text>


						<View style={{ marginTop: 8, marginBottom: 8 }}>
							<Button
								theme={roundness}
								color={colors.accent }
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
								onPress={()=>setAdditionalModal(true)}
							>
							{'Adicional'}
							</Button>
						</View>

						<FlatList
							data={isNew ?
								[] :
								additionals.map((additional, i) => ({ ...additional, id: i }))
							}
							renderItem={({item}) => (
									<View style={styles.ingredientView}>
										<View style={{flex:9}}>
											<Field
												name={item.name}
												component={MyCheckbox}
												label={`${item.name} (Q${item.cost})`}
												functionCheckbox={()=>changeAdditionalDefault(item.id)}
												containerStyle={{backgroundColor:null, width:'90%', alignSelf:'center'}}
												center={true}
												checked={item.default}
											/>
										</View>

										{/* Botón para eliminar */}
										<TouchableOpacity
											style={[styles.deleteButton]}
											onPress={() => removeAdditional(item.id)}
										>
											<MaterialCommunityIcons
												name="minus"
												color={'red'}
												size={25}
											/>
										</TouchableOpacity>
									</View>
							)
							}
						/>
						<Divider style={styles.contentDivider} />
						
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

			<ModalIngredients
				modal={ingredientModal}
				closeModal={()=>setIngredientModal(false)}
				submitFunction={(values)=>addIngredient(values)}
			/>

			<ModalAdditional
				modal={additionalModal}
				closeModal={()=>setAdditionalModal(false)}
				submitFunction={(values)=>addAdditional(values)}
			/>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	ingredientView: {
		alignSelf:'center',
		width:'100%',
		display:'flex',
		flexDirection:'row',
		alignItems:'center',
		alignContent:'center',
	},
	contentDivider: {
		backgroundColor:'red',
		marginTop:20,
		marginBottom:20
	},
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
	deleteButton:{
		flex:1,
		marginRight:10,
		borderRadius: 5,
		width: 30,
		height: 30,
		borderStyle: 'solid',
		borderWidth: 2,
		borderColor: '#FA7659',
		alignItems: 'center',
	},
});

export default connect(
	state => ({
		initialValues: selectors.getSelectedProduct(state),
		ingredients: selectors.getSelectedProductIngredients(state),
		additionals: selectors.getSelectedProductAdditionals(state),
		categories: selectors.getCategories(state),
	}),

	dispatch => ({
		createProduct(navigation, values) {
			const product = omit(values, ['additional', 'additionalCost']);
			dispatch(actionsProducts.startAddingProduct(product));
			navigation.navigate('Menu');
		},
		
		editProduct(navigation, product) {
			dispatch(actionsProducts.startEditingProduct(product));
			navigation.navigate('Menu');
		},

		addIngredient(values) {
			const ingredientInfo = {
				name: values.additional,
				default: true
			};

			dispatch(actionsProducts.addIngredient(ingredientInfo));
		},

		addAdditional(values) {
			const additionalInfo = {
				name: values.additional,
				default: false,
				cost: parseFloat(values.additionalCost).toFixed(2),
			}

			dispatch(actionsProducts.addAdditional(additionalInfo));
		},

		removeIngredient(idx){
			dispatch(actionsProducts.removeIngredient(idx));
		},

		removeAdditional(idx){
			dispatch(actionsProducts.removeAdditional(idx));
		},

		changeIngredientDefault(id) {
			dispatch(actionsProducts.toggleIngredientDefault(id));
		},

		changeAdditionalDefault(id) {
			console.log(id)
			dispatch(actionsProducts.toggleAdditionalDefault(id));
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