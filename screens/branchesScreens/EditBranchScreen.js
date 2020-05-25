import React, { useState } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { ScrollView } from 'react-native-gesture-handler';
import { Image, StyleSheet, View, KeyboardAvoidingView, Keyboard, Alert } from 'react-native';
import { TextInput, withTheme, Text, Button, ActivityIndicator } from 'react-native-paper';

import randomString from 'random-string'
import * as firebase from "firebase";
import 'firebase/firestore';

import ImagePicker from '../../components/ImagePickerUser';
import MyTextInput from '../../components/textInput';
import PickerInput from '../../components/PickerInput';
import * as selectors from '../../src/reducers';
import * as actionsUsers from '../../src/actions/branches';

function EditBranchScreen({ theme, navigation, dirty, valid, handleSubmit, initialValues, createBranch, updateBranch }) {
  const { colors, roundness } = theme;
  const isNew = initialValues == null;
  if(!isNew)
    navigation.setOptions({ title: 'EDITAR SUCURSAL' });

  const branchForm = values => {
    
    if(isNew){
      createBranch(navigation, values)
    } else {
      updateBranch(navigation, values)
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
          {/* <Field name={'image'} component={ImagePicker} image={isNew ? null : initialValues.image}/> */}
          <Field name={'name'} component={MyTextInput} label='Nombre' placeholder='Ingresa el nombre de la sucursal'/>
          <Field name={'location'} component={MyTextInput} label='Dirección' placeholder='Ingresa la dirección'/>
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
              onPress={handleSubmit(branchForm)}>
              {isNew ? 'CREAR SUCURSAL' : 'EDITAR SUCURSAL'}
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
    initialValues: selectors.getSelectedBranch(state),
  }),
  dispatch => ({
    createBranch(navigation, branch) {
      dispatch(actionsUsers.startAddingBranch(branch));
      navigation.navigate('BranchesList');
    },
    updateBranch(navigation, branch) {
      dispatch(actionsUsers.startUpdatingBranch(branch));
      navigation.navigate('BranchesList');
    },
  }),
)(reduxForm({
  form: 'branchForm',
  enableReinitialize : true,
  validate: (values) => {
    const errors = {};
    errors.name = !values.name ? 'Este campo es obligatorio' : undefined;
    errors.location = !values.location ? 'Este campo es obligatorio' : undefined;
   

    return errors;
  }
})(withTheme(EditBranchScreen)));