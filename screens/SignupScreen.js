import React, { useState } from 'react';
import { reduxForm, Field } from 'redux-form';
import { ScrollView } from 'react-native-gesture-handler';
import { Image, StyleSheet, View, KeyboardAvoidingView, Keyboard, Alert } from 'react-native';
import { TextInput, withTheme, Text, Button, Modal, ActivityIndicator } from 'react-native-paper';

import randomString from 'random-string'
import * as firebase from "firebase";
import 'firebase/firestore';

import ImagePicker, * as imageUploadFunctions from '../components/ImagePickerUser';
import MyTextInput from '../components/textInput';


async function createUserCollectionFirebase ({ email, name, lastName, image, uid })
{
  let db = firebase.firestore();
  let newUserDoc = db.collection('users').doc(uid);
  return newUserDoc.set({
    email: email,
    name: name,
    lastName: lastName,
    uid: uid,
    image: image,
  });
}

function SignupScreen({ theme, navigation, dirty, valid, handleSubmit }) {
  const { colors, roundness } = theme;
  const [modalVisibleIndicatorLogin, setModalVisibleIndicatorLogin] = useState(false);
  const signUp = values => {
    console.log('Submitting form', values)
    signupFirebase(values)
  }

  async function signupFirebase({ email, name, lastName, image }) {
    Keyboard.dismiss();
    setModalVisibleIndicatorLogin(true);
    try {
      //Create Random Password
      let password = randomString();
     
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      let uid = await firebase.auth().currentUser.uid;
      image = image !== undefined ? image : null;
      if (image !== null){
        let blob = await imageUploadFunctions.uriToBlob(image);
        await imageUploadFunctions.uploadToFirebase(blob, uid);

        image = uid;
      }

      await createUserCollectionFirebase({ email, name, lastName, image, uid })
      //Enviar correo para resetear password al gusto del mesero
      await firebase.auth().sendPasswordResetEmail(email);
      setModalVisibleIndicatorLogin(false);
      setTimeout(function() {
        Alert.alert(
          "Nueva cuenta creada",
          "La nueva cuenta se ha creado con éxito. El último paso es verificar el correo electrónico y resetear su contraseña.",
          [
            { text: 'OK', onPress: () => {} },
          ],
        )}, 100
      )
      navigation.navigate('Login')
    } catch(error) {
      console.log(error.toString());
      let errorMessage = ""
      switch(error.toString()) {
        case "Error: The email address is already in use by other account.":
          errorMessage = "El correo ingresado ya está en uso por otro usuario."
          break;
        default:
          console.log(error.toString());
          errorMessage = "No se pudo crear el usuario."
      }
      setModalVisibleIndicatorLogin(false);
      setTimeout(function() {
        Alert.alert(
          "Error",
          errorMessage,
          [
            { text: 'OK', onPress: () => {}},
          ],
        )}, 100
      )
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
          <Text style={{...styles.titleStyle, color: colors.accent, }}>Registro</Text>
          <Field name={'image'} component={ImagePicker} image={null}/>
          <Field name={'name'} component={MyTextInput} label='Nombre' placeholder='Ingresa tu nombre'/>
          <Field name={'lastName'} component={MyTextInput} label='Apellido' placeholder='Ingresa tu apellido'/>
          <Field name={'email'} component={MyTextInput} label='Correo' placeholder='Ingresa tu correo'/>
         
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
            REGISTRARSE
          </Button>
        </View>
        <Modal
          transparent={true}
          animationType={'none'}
          visible={modalVisibleIndicatorLogin}>
          <View style={styles.modalBackground}>
            <View style={styles.activityIndicatorMessage}>
              <ActivityIndicator size="large" animating={modalVisibleIndicatorLogin} color={colors.primary} />
            </View>
          </View>
        </Modal>
        <Text style={styles.textStyle}>¿Ya tienes una cuenta?
            <Text style={{
              ...styles.textStyle, 
              color: colors.accent
              }} 
              onPress={() => navigation.navigate('Login')}> 
              Inicia Sesión
            </Text>
        </Text>
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
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});

export default reduxForm({
  form: 'signUp',
  validate: (values) => {
    const errors = {};
    errors.name = !values.name ? 'Este campo es obligatorio' : undefined
    errors.lastName = !values.lastName ? 'Este campo es obligatorio' : undefined
    errors.email = !values.email ? 'Este campo es obligatorio' : !values.email.includes('@') ? 'Tienes que ingresar un correo válido' : undefined;
   

    return errors;
  }
})(withTheme(SignupScreen));