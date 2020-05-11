import React, { useState } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { ScrollView } from 'react-native-gesture-handler';
import { Image, StyleSheet, View, KeyboardAvoidingView, Keyboard, Modal, Alert } from 'react-native';
import { TextInput, withTheme, Text, Button, ActivityIndicator } from 'react-native-paper';

import randomString from 'random-string'
import * as firebase from "firebase";
import 'firebase/firestore';

import ImagePicker from '../components/ImagePickerUser';
import MyTextInput from '../components/textInput';
import * as selectors from '../src/reducers';
import * as actionsUsers from '../src/actions/users';


function SignupScreen({ theme, navigation, dirty, valid, handleSubmit, initialValues, isAdding, isEditing, createUser, editUser }) {
  const { colors, roundness } = theme;
  const isNew = initialValues==null;
  var isLoading = false;
  if(!isNew) {
    navigation.setOptions({ title: 'EDITAR USUARIO' });
    isLoading = isEditing;
  } else {
    isLoading = isAdding;
  }

  const signUp = values => {
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
         
          <Button
            disabled={!(dirty && valid)}
            theme={roundness}
            color={'#000000'}
            icon="login"
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
              marginTop: '4%',
              justifyContent: 'center',
            }}
            onPress={handleSubmit(signUp)}>
            CREAR CUENTA
          </Button>
        </View>
      </ScrollView>
      <Modal
        transparent={true}
        animationType={'none'}
        visible={isLoading}>
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <ActivityIndicator size="large" animating={isLoading} color={colors.primary} />
          </View>
        </View>
      </Modal>
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
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 150,
    width: 150,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});

export default connect(
  state => ({
    initialValues: selectors.getSelectedUser(state),
    isAdding: selectors.isAddingUsers(state),
    isEditing: selectors.isEditingUsers(state),
  }),
  dispatch => ({
    createUser(navigation, user) {
      dispatch(actionsUsers.startAddingUser(user));
      //navigation.navigate('UserList');
    },
    editUser(navigation, user) {
      dispatch(actionsUsers.startEditingUser(user));
      //navigation.navigate('UserList');
    },
  }),
)(reduxForm({
  form: 'signUp',
  enableReinitialize : true,
  validate: (values) => {
    const errors = {};
    errors.name = !values.name ? 'Este campo es obligatorio' : undefined
    errors.lastName = !values.lastName ? 'Este campo es obligatorio' : undefined
    errors.email = !values.email ? 'Este campo es obligatorio' : !values.email.includes('@') ? 'Tienes que ingresar un correo válido' : undefined;
   

    return errors;
  }
})(withTheme(SignupScreen)));