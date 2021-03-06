import 'firebase/firestore';
import React from 'react';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, withTheme } from 'react-native-paper';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../logic/actions/categories';
import * as selectors from '../../logic/reducers';
import MyTextInput from '../general/textInput';



function EditCategoryScreen({ theme, navigation, dirty, valid, handleSubmit, initialValues, createCategory, editCategory }) {
  const { colors, roundness } = theme;
  const isNew = initialValues==null;
  if(!isNew)
    navigation.setOptions({ title: 'EDITAR CATEGORÍA' });

  const newCategory = values => {
    if(isNew){
      createCategory(navigation, values)
    } else {
      editCategory(navigation,values)
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
          <Field name={'categoryName'} component={MyTextInput} label='Nombre' placeholder='Ingresa el nombre de la categoría'/>
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
              onPress={handleSubmit(newCategory)}>
              {isNew ? 'CREAR CATEGORÍA' : 'EDITAR CATEGORÍA'}
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
    categories: selectors.getCategories(state),
    initialValues: selectors.getCategorySelected(state),
  }),
  dispatch => ({
    createCategory(navigation, category) {
      dispatch(actions.startAddingCategory(category));
      navigation.navigate('CategoriesList');
    },
    editCategory(navigation, category) {
      dispatch(actions.startEditingCategory(category));
      navigation.navigate('CategoriesList');
    },
  }),
)(reduxForm({
  form: 'newCategory',
  enableReinitialize : true,
  validate: (values, {categories, initialValues}) => {
    const errors = {};
    if(initialValues==null) 
      errors.categoryName = !values.categoryName ? 'Este campo es obligatorio' : 
        categories.filter(category => category.categoryName.toLowerCase() == values.categoryName.toLowerCase()).length > 0 ? 'Ya existe una categoría con ese nombre' : undefined;
    else
      errors.categoryName = !values.categoryName ? 'Este campo es obligatorio' : undefined;
    return errors;
  }
})(withTheme(EditCategoryScreen)));