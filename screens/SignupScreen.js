import React, { useState } from 'react';
import { Image, StyleSheet, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { withTheme, Text, Button } from 'react-native-paper';
import * as firebase from "firebase";
import 'firebase/firestore';

async function createUserCollectionFirebase ({ email, name, lastName, image, phoneNumber, uid })
{
  let db = firebase.firestore();
  let newUserDoc = db.collection('users').doc(uid);
  return newUserDoc.set({
    email: email,
    name: name,
    lastName: lastName,
    phoneNumber: phoneNumber,
    uid: uid,
    image: image,
  });
}

function SignupScreen({ theme, navigation, dirty, valid, handleSubmit }) {
  const { colors, roundness } = theme;
  const [modalVisibleIndicatorLogin, setModalVisibleIndicatorLogin] = useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
    >
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={contentContainer}>
        <View style={styles.formContainer}>
          <Text style={{...styles.titleStyle, color: colors.accent, }}>Registro</Text>
        </View>
      </ScrollView>
    </View>
    </KeyboardAvoidingView>
  )  
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
  titleStyle: {
    textAlign: 'center',
    fontFamily: 'dosis-extra-bold',
    fontSize: 30,
    paddingBottom: '6%',
    paddingTop: '8%',
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
  undefined,
)(withTheme(SignupScreen));