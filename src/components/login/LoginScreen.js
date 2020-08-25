import * as firebase from "firebase";
import React, { useState } from 'react';
import { ActivityIndicator, Alert, AsyncStorage, Image, Keyboard, KeyboardAvoidingView, Modal, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput, withTheme } from 'react-native-paper';
import { NavigationActions, StackActions } from 'react-navigation';
import { connect } from 'react-redux';
import * as actionsLoggedUser from '../../logic/actions/loggedUser';


const resetAction = StackActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({ routeName: 'HomeAdmin'})
    ] })
            


function LoginScreen({ theme, navigation, saveLoggedUser }) {
  const { colors, roundness } = theme;
  const [modalVisibleIndicatorLogin, setmodalVisibleIndicatorLogin] = useState(false);
  const [mailInput, changeMailInput] = useState('');
  const [password, changePassword] = useState('');
  const [verifyingUser, setVerifyingUser] = useState(true);
  async function getPersistedStorage() {
    
    if(verifyingUser){
      
      try {
        let userCheckpoint = JSON.parse(await AsyncStorage.getItem('userCheckpoint'));
        console.log("persisted storage")
        console.log(userCheckpoint)
        if(userCheckpoint){
          let saveLogged = await saveLoggedUser(navigation,userCheckpoint)
          if(saveLogged){
            setVerifyingUser(false)
          }
          
          console.log("Relogin succesfull");
          
        }else{
          setVerifyingUser(false)
        }
        
      } catch (error) {
        console.log(error);
        setVerifyingUser(false)
        
      }
       
    }
  }
  getPersistedStorage();
  async function login(email, pass) {
    Keyboard.dismiss();
    console.log("started");
    setmodalVisibleIndicatorLogin(true);
     try {
         
         await firebase.auth()
             .signInWithEmailAndPassword(email, pass);
   
            
            
         // Navigate to the Home page, the user is auto logged in
         user=await firebase.auth().currentUser; 
         if(user.emailVerified){
            await saveLoggedUser(navigation,user)
            setmodalVisibleIndicatorLogin(false);
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
      { !verifyingUser &&
    <View style={styles.container}>
      <View style={{flex:0.4}}/>
      <View style={styles.imageContainer}>
        <Image
          source={ require('../../assets/images/checkpoint.jpg') }
          style={styles.logoImage}
        />
      </View>
      <View style={{flex:0.2}}/>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.inputContainerStyle}
          mode={'outlined'}
          keyboardType='email-address'
          label="Correo"
          placeholder="Ingresa tu correo"
          value={mailInput}
          onChangeText={changeMailInput}
          testID='user'
        />
        <TextInput
          style={styles.inputContainerStyle}
          mode={'outlined'}
          label="Contraseña"
          placeholder="Ingresa tu contraseña"
          value={password}
          onChangeText={changePassword}
          secureTextEntry={true}
          testID='password'
        />
        <Button
          theme={roundness}
          color={'#000000'}
          icon="login"
          height = "18%"
          mode="contained"
          labelStyle={{
            fontFamily:"dosis-bold",
            fontSize: 15,
          }}
          style={{
            fontFamily: 'dosis',
            marginLeft: '5%',
            marginRight: '5%',
            marginTop:'4%',
            justifyContent: 'center',            
            
          }}
          testID='loginButton'
          onPress={() => login(mailInput,password)}>
          INICIAR SESIÓN
        
        </Button>
      <Text style={styles.textStyle}>¿Olvidaste tu contraseña?
        <Text style={{...styles.textStyle, color: colors.accent }} onPress={() => resetPassword(mailInput)}  testID='forgotPassword'> Recuperar contraseña.</Text>
      </Text>
      </View>      
      <Modal
        transparent={true}
        animationType={'none'}
        visible={modalVisibleIndicatorLogin}>
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator size="large" animating={modalVisibleIndicatorLogin} color={colors.primary}/>
          </View>
        </View>
    </Modal>   
      
    </View>
    }
    <Modal
        transparent={true}
        animationType={'none'}
        visible={verifyingUser}>
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator size="large" animating={verifyingUser} color={colors.primary}/>
          </View>
        </View>
    </Modal>  
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

      //Se cargan los usuarios
      try{
        const userLoggedIn = await firebase.firestore().collection('users').doc(user.uid).get();
        dispatch(actionsLoggedUser.login(userLoggedIn.data()));

        if(userLoggedIn.data().userTypeId==1){
          navigation.replace('HomeAdmin');
        }else{
          navigation.replace('HomeWaiters');
        }
      }catch{
        console.log("Error en loggear internet.")
      }
      return await true
      
     
    },
  }),
)(withTheme(LoginScreen));