import React, { useState } from 'react';
import { Image, StyleSheet, View,KeyboardAvoidingView} from 'react-native';
import {  withTheme, } from 'react-native-paper';
import { connect } from 'react-redux';
import * as firebase from "firebase";

import * as actionsLoggedUser from '../src/actions/loggedUser';
import * as actionsCategories from '../src/actions/categories';


function LoginScreen({ theme, navigation, saveLoggedUser }) {
	const { colors, roundness } = theme;
  const [modalVisibleIndicatorLogin, setmodalVisibleIndicatorLogin] = useState(false);
  const [mailInput, changeMailInput] = useState('');
  const [password, changePassword] = useState('');
  async function login(email, pass) {
    Keyboard.dismiss();
    console.log("started");
    setmodalVisibleIndicatorLogin(true);
     try {
         
         await firebase.auth()
             .signInWithEmailAndPassword(email, pass);
   
            
            setmodalVisibleIndicatorLogin(false);
         // Navigate to the Home page, the user is auto logged in
         user=await firebase.auth().currentUser; 
         if(user.emailVerified){
            saveLoggedUser(navigation,user)
            console.log("Login succesfull");
         }else{
          console.log("Verificar correo!");
          setTimeout(function(){
            Alert.alert(
             "Verificar correo",
             "Verifique su correo electrónico para ingresar a la plataforma.",
             [
              {text: 'Enviar correo de nuevo', onPress: () => {firebase.auth().currentUser.sendEmailVerification()}},
               {text: 'Ok', onPress: () => {}},
             ],
            )},100)
         }
         
     } catch (error) {
         console.log(error.toString());
         setmodalVisibleIndicatorLogin(false);
         setTimeout(function(){
         Alert.alert(
          "Error",
          "Los datos ingresados no son válidos para ningún usuario.",
          [
            {text: 'OK', onPress: () => {}},
          ],
         )},100)
	 }
	 
	 async function resetPassword(email) {
		Keyboard.dismiss();
		setmodalVisibleIndicatorLogin(true);
		 try {
			 
			 await firebase.auth().sendPasswordResetEmail(email);
	   
			console.log("Password reset succesfull");
			setmodalVisibleIndicatorLogin(false);
			setTimeout(function(){
			  Alert.alert(
			   "Recuperación Contraseña",
			   "Correo para reestablecimiento de contraseña enviado.",
			   [
				 {text: 'OK', onPress: () => {}},
			   ],
			  )},100)   
			 
	
			
			 
		 } catch (error) {
			 console.log(error.toString());
			 setmodalVisibleIndicatorLogin(false);
			 setTimeout(function(){
			 Alert.alert(
			  "Error",
			  "Error, correo ingresado no válido.",
			  [
				{text: 'OK', onPress: () => {}},
			  ],
			 )},100)
		 }
   
  }
  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
    >
    <View style={styles.container}>
      
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
  topContainer: {
    flex: 0.8,
    paddingTop:50
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 5,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  inputContainerStyle: {
    margin: 8,
  },
  imageContainer: {
    alignItems: 'center'
  },
  logoImage: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  inputContainerStyle: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
  },
  textStyle:{
    textAlign: 'center', 
    fontFamily: 'dosis-semi-bold',
    fontSize:16,
    paddingTop:'4%',
    paddingBottom:'4%'
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

export default connect(
  undefined,
  dispatch => ({
    async saveLoggedUser(navigation,user) {
      //Se cargan las categorias
      dispatch(actionsCategories.clearCategories());
      const categories = await firebase.firestore().collection('categories').get();
      categories.docs.map(doc=> dispatch(actionsCategories.addCategory(doc.data())));
      //Se cargan los usuarios
      const userLoggedIn = await firebase.firestore().collection('users').doc(user.uid).get();
      dispatch(actionsLoggedUser.login(userLoggedIn.data()));
      navigation.navigate('Home');
    },
  }),
)(withTheme(LoginScreen));