import 'firebase/firestore';
import React from 'react';
import { KeyboardAvoidingView, StyleSheet, View, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, withTheme } from 'react-native-paper';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import ImagePicker from '../../components/general/ImagePickerUser';
import PickerInput from '../../components/general/PickerInput';
import MyTextInput from '../../components/general/textInput';
import * as actionsUsers from '../../logic/actions/users';
import * as selectors from '../../logic/reducers';



const userTypesArray = [{ label:'Administrador', value:"1" }, { label:'Mesero', value:"2" }];
// const restaurants = [{ label:'Checkpoint z11', value:"1" }, { label:'Checkpoint z16', value:"2" }];

function EditUserScreen({ theme, navigation, dirty, valid, handleSubmit, initialValues, createUser, editUser, branches, createErrors, addStatus, clearStatus }) {

  let restaurants = [];
  branches.map((branch, index) => restaurants.push({
    label: branch.name,
    value: branch.id,
  }));

  if (addStatus === "COMPLETED") {
    clearStatus();
    navigation.navigate('UserList');
  }

  const { colors, roundness } = theme;
  const isNew = initialValues==null;
  if(!isNew)
    navigation.setOptions({ title: 'EDITAR USUARIO' });

  const signUp = values => {

    var selectedRestaurant = restaurants.filter(restaurant => restaurant.value == values.restaurant[0])[0];

    values.restaurantId = selectedRestaurant.value;
    values.restaurantName = selectedRestaurant.label;
    var selectedUserType = userTypesArray.filter(userType => userType.value == values.userType[0])[0];
    values.userTypeId = selectedUserType.value;
    values.userTypeName = selectedUserType.label;


    if(isNew){
      createUser(values)
    } else {
      editUser(navigation, values)
    }
  }

  if (createErrors !== null && addStatus === "FAILED") {
    setTimeout(() => {
      Alert.alert(
        "Error",
        "Error, el correo ingresado ya ha tiene una cuenta asociada.",
        [
          {text: 'OK', onPress: () => {}},
        ],
      )
      clearStatus();
    }, 1000)
    
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
          <Field name={'email'} component={MyTextInput} label='Correo' placeholder='Ingresa tu correo' keyboardType='email-address' disabled={isNew ? false : true}/>
          <Field name={'name'} component={MyTextInput} label='Nombre' placeholder='Ingresa tu nombre'/>
          <Field name={'lastName'} component={MyTextInput} label='Apellido' placeholder='Ingresa tu apellido'/>
          <Field name={'userType'} component={PickerInput} title='Tipo' single={true} selectedText="Tipo" placeholderText="Seleccionar tipo de usuario" options={userTypesArray}
            selectedItems={!isNew?[initialValues.userTypeId]:[]}/>
          <Field name={'restaurant'} component={PickerInput} title='Sucursal' single={true} selectedText="Sucursal" placeholderText="Seleccionar una sucursal" options={restaurants}
            selectedItems={!isNew ? [initialValues.restaurantId] : []}/>
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
    branches: selectors.getBranches(state),
    initialValues: selectors.getSelectedUser(state),
    createErrors: selectors.getUsersError(state),
    addStatus: selectors.getAddStatus(state),
  }),
  dispatch => ({
    createUser(user) {
      dispatch(actionsUsers.clearAddingUser());
      dispatch(actionsUsers.startAddingUser(user));
    },
    clearStatus() {
      dispatch(actionsUsers.clearAddingUser());
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