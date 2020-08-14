import 'firebase/firestore';
import React from 'react';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, withTheme } from 'react-native-paper';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import ImagePicker from '../../components/general/ImagePickerProduct';
import PickerInput from '../../components/general/PickerInput';
import MyTextInput from '../../components/general/textInput';
import * as actionsProducts from '../../logic/actions/products';
import * as selectors from '../../logic/reducers';
import MyCheckbox from '../general/checkbox';



const restaurantsArray = [{ label:'Checkpoint z11', value:"1" }, { label:'Checkpoint z16', value:"2" }];

function EditProductScreen({ theme, navigation, dirty, valid, handleSubmit, initialValues, createProduct, editProduct, categories }) {
  const { colors, roundness } = theme;
  const isNew = initialValues==null;
  if(!isNew)
    navigation.setOptions({ title: 'EDITAR PRODUCTO' });

  const editProductForm = values => {
    var selectedCategory = categories.filter(category => category.categoryId == values.category[0])[0];
    values.category = selectedCategory;
    values.categoryId = selectedCategory.categoryId;
    console.log('Submitting form', values)

    if(isNew){
      createProduct(navigation,values)
    } else {
      editProduct(navigation,values)
    }
    
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
  }
});

export default connect(
  state => ({
    initialValues: selectors.getSelectedProduct(state),
    categories: selectors.getCategories(state),
  }),
  dispatch => ({
    createProduct(navigation, product) {
      dispatch(actionsProducts.startAddingProduct(product));
      navigation.navigate('Menu');
    },
    editProduct(navigation, product) {
      dispatch(actionsProducts.startEditingProduct(product));
      navigation.navigate('Menu');
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