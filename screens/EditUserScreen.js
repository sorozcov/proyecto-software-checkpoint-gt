import React, { useState } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { ScrollView } from 'react-native-gesture-handler';
import { Image, StyleSheet, View, KeyboardAvoidingView, Keyboard, Alert } from 'react-native';
import { TextInput, withTheme, Text, Button, ActivityIndicator } from 'react-native-paper';

import randomString from 'random-string'
import * as firebase from "firebase";
import 'firebase/firestore';

import ImagePicker from '../components/ImagePickerUser';
import MyTextInput from '../components/textInput';
import PickerInput from '../components/PickerInput';
import * as selectors from '../src/reducers';
import * as actionsUsers from '../src/actions/users';

const userTypesArray = [{ label:'Administrador', value:"1" }, { label:'Mesero', value:"2" }];
const restaurantsArray = [{ label:'Checkpoint Zona 10', value:"1" }, { label:'Checkpoint Zona 16', value:"2" }];

function EditUserScreen({ theme, navigation, dirty, valid, handleSubmit, initialValues, createUser, editUser }) {
  const { colors, roundness } = theme;
  const isNew = initialValues==null;
  if(!isNew)
    navigation.setOptions({ title: 'EDITAR USUARIO' });

  const signUp = values => {
    var selectedRestaurant = restaurantsArray.filter(restaurant => restaurant.value == values.restaurant[0])[0];
    values.restaurantId = selectedRestaurant.value;
    values.restaurantName = selectedRestaurant.label;
    var selectedUserType = userTypesArray.filter(userType => userType.value == values.userType[0])[0];
    values.userTypeId = selectedUserType.value;
    values.userTypeName = selectedUserType.label;
    console.log('Submitting form', values)

    if(isNew){
      createUser(navigation,values)
    } else {
      editUser(navigation,values)
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
          <Field name={'name'} component={MyTextInput} label='Nombre' placeholder='Ingresa tu nombre'/>
          <Field name={'lastName'} component={MyTextInput} label='Apellido' placeholder='Ingresa tu apellido'/>
          <Field name={'email'} component={MyTextInput} label='Correo' placeholder='Ingresa tu correo' keyboardType='email-address'/>
          <Field name={'userType'} component={PickerInput} title='Tipo' single={true} selectedText="Tipo" placeholderText="Seleccionar tipo de usuario" options={userTypesArray}
            selectedItems={!isNew?[initialValues.userTypeId]:[]}/>
          <Field name={'restaurant'} component={PickerInput} title='Sucursal' single={true} selectedText="Sucursal" placeholderText="Seleccionar una sucursal" options={restaurantsArray}
            selectedItems={!isNew?[initialValues.restaurantId]:[]}/>
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
              onPress={handleSubmit(signUp)}>
              {isNew ? 'CREAR CUENTA' : 'EDITAR CUENTA'}
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
    initialValues: selectors.getSelectedUser(state),
  }),
  dispatch => ({
    createUser(navigation, user) {
      dispatch(actionsUsers.startAddingUser(user));
      navigation.navigate('UserList');
    },
    editUser(navigation, user) {
      dispatch(actionsUsers.startEditingUser(user));
      navigation.navigate('UserList');
    },
  }),
)(reduxForm({
  form: 'signUp',
  enableReinitialize : true,
  validate: (values) => {
    const errors = {};
    errors.name = !values.name ? 'Este campo es obligatorio' : undefined
    errors.lastName = !values.lastName ? 'Este campo es obligatorio' : undefined
    errors.restaurant = values.restaurant && values.restaurant.length === 0 ? 'Este campo es obligatorio' : undefined
    errors.userType = values.userType && values.userType.length === 0 ? 'Este campo es obligatorio' : undefined
    errors.email = !values.email ? 'Este campo es obligatorio' : !values.email.includes('@') ? 'Tienes que ingresar un correo válido' : undefined;
   

    return errors;
  }
})(withTheme(EditUserScreen)));