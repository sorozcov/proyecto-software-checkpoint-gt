// Configuracion de Firebase
import * as firebase from 'firebase';

//Firebase Config del Proyecto
var firebaseConfig = {
  apiKey: "AIzaSyAKPue3cCi_HLt9uZE7RoZIN2alLC0HJi8",
  authDomain: "software-checkpoint-gt.firebaseapp.com",
  databaseURL: "https://software-checkpoint-gt.firebaseio.com",
  projectId: "software-checkpoint-gt",
  storageBucket: "software-checkpoint-gt.appspot.com",
  messagingSenderId: "960829337971",
  appId: "1:960829337971:web:4bea91361f1deaf7ca9506",
  measurementId: "G-8RFP288CFR"
};

//Inicializar configuración de Firebase

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseFirestore =  firebase.firestore();
const firebaseStorage =firebase.storage().ref();

export {
  firebaseApp,
  firebaseFirestore,
  firebaseStorage,
  firebase
}