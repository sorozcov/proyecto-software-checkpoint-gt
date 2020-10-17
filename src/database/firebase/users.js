/* -------------------------------------------------------------------------- */
/*                        Functions for Users Firebase                        */
/* -------------------------------------------------------------------------- */


import randomString from 'random-string';
import { firebaseAuth, firebaseFirestore } from '.';
import { uploadImageToFirebase } from './images';
import * as actions from '../../logic/actions/users';
import { store } from '../../../App'
import * as selectors from '../../logic/reducers';

import uuid from 'react-native-uuid';


const db = firebaseFirestore;
const collection = "users";
var suscribeFunction = null;

//Obtener usuarios de firebase
export const getUsers = async() => {
    try {
        const users = await db.collection(collection).get();
        let usersArray = [];

        users.docs.forEach(user => {
            usersArray.push(user.data());
        });

        let usersNormalizer = {};
        let userById = {};

        usersNormalizer['order'] = usersArray.map(user => user.uid)
        usersArray.map((user) => { userById[user.uid] = user })
        usersNormalizer['byId'] = userById;
        usersNormalizer['array'] = usersArray;



        return { users: usersNormalizer, error: null };
    } catch (error) {
        return {
            users: null,
            error
        }
    }
}


//Agregar un usuario o editar un usuario. Si el usuario se editar enviar uid null o no enviar.
export const updateUser = async({
    uid = null,
    email,
    name,
    lastName,
    image,
    userTypeId,
    userTypeName,
    restaurantId,
    restaurantName,
    canChangeBranch
}) => {
    try {
        let userDoc = null;
        let userData = null;
        let isNew = uid == null;
        let imageUid = uuid.v1()
        
        if (isNew) {
            //Create Random Password for User to change with the email confirmation
            let password = randomString();
            //Create firebase user with firebaseAuth
            await firebaseAuth.createUserWithEmailAndPassword(email, password);
            uid = firebaseAuth.currentUser.uid;
        }
        userDoc = firebaseFirestore.collection(collection).doc(uid);
        uid = userDoc.id;
        let idk = await firebaseFirestore.collection(collection).doc(uid).get()
        idk = idk.data()

        let dateModified = new Date();
        dateModified = dateModified.getTime();

        if (isNew) {
            //Vemos si necesita subir una imagen
            image = image !== undefined ? image : null;
            if (image !== null) {
                let uploadImg = await uploadImageToFirebase(image, imageUid, "UserImages");
                if (!uploadImg.uploaded) {
                    //Error subiendo imagen
                    console.log(uploadImg.error);
                }
                image = imageUid;
            }
            //Creamos el documento del usuario
            userData = {
                email: email,
                name: name,
                lastName: lastName,
                uid: uid,
                image: image,
                userTypeName: userTypeName,
                userTypeId: userTypeId,
                restaurantId: restaurantId,
                restaurantName: restaurantName,
                dateModified: dateModified,
                canChangeBranch: canChangeBranch,
            };

            await userDoc.set(userData);
            //Enviar correo para resetear password al gusto del mesero
            await firebaseAuth.sendPasswordResetEmail(email);

        } else {
            //Vemos si necesita hacer update de la imagen
            //Vemos si necesita subir una imagen
            image = image !== undefined ? image : null;
            if (image !== null) {
                if (!image.includes(idk.image)) {
                    try{
                
                        await firebase.storage().ref("UserImages/" + idk.image + '.jpg').delete();
                        await firebase.storage().ref("UserImages/" + idk.image + '_200x200.jpg').delete();
                        await firebase.storage().ref("UserImages/" + idk.image + '_400x400.jpg').delete();
                        await firebase.storage().ref("UserImages/" + image + '_600x600.jpg').delete();
                      }catch(error){
                        console.log("Error eliminando imagenes.")
                      }
                    let uploadImg = await uploadImageToFirebase(image, imageUid, "UserImages");
                    if (!uploadImg.uploaded) {
                        //Error subiendo imagen
                        console.log(uploadImg.error);
                    }
                }
                image = imageUid;
            }

            //Hacemos update al documento del usuario
            userData = {
                email: email,
                name: name,
                lastName: lastName,
                uid: uid,
                image: image,
                userTypeName: userTypeName,
                userTypeId: userTypeId,
                restaurantId: restaurantId,
                restaurantName: restaurantName,
                dateModified: dateModified,
                canChangeBranch: canChangeBranch,
            };

            await userDoc.update(userData);
        }
        return { user: userData, error: null, errorMessage: null }

    } catch (error) {
        console.log('ERROR UPDATE USER --> ', error.toString());
        let errorMessage = ""
        switch (error.toString()) {
            case "Error: The email address is already in use by other account.":
                errorMessage = "El correo ingresado ya está en uso por otro usuario."
                break;
            default:
                console.log(error.toString());
                errorMessage = "No se pudo crear el usuario."
        }
        return { user: null, error, errorMessage }
    }
}

//Funcion para eliminar un usuario.
export const deleteUser = async({ uid }) => {
    try {
        let userDoc = firebaseFirestore.collection(collection).doc(uid);

        userDoc = await userDoc.delete();
        return {
            uid: uid,
            error: null,
            errorMessage: null
        }
    } catch (error) {
        console.log("ERROR" + error.toString());
        let errorMessage = "No se pudo eliminar el usuario."
        return {
            errorMessage: errorMessage,
            error: error,
            uid: null
        }
    }
}

//Suscribe to user changes
export const suscribeUsers = async() => {
    suscribeFunction = db.collection(collection)
        .onSnapshot(function(snapshot) {
            snapshot.docChanges().forEach(function(change) {
                if (change.type === "added") {
                    // console.log("New user: ", change.doc.data());
                    let id = change.doc.id;
                    let docSaved = selectors.getUser(store.getState(), id)
                    if (docSaved !== null && docSaved !== undefined) {
                        console.log("Retrieve user again.")
                    } else {
                        store.dispatch(actions.completeAddingUser({...change.doc.data(), uid: change.doc.id }))
                    }
                }
                if (change.type === "modified") {
                    store.dispatch(actions.completeEditingUser({...change.doc.data(), uid: change.doc.id }))
                        // console.log("Modified user: ", change.doc.data());
                }
                if (change.type === "removed") {
                    store.dispatch(actions.completeRemovingUser(change.doc.id))
                        // console.log(change.doc.id)
                        // console.log("Removed user: ", change.doc.data());
                }
            });
        });
}

//Unsuscribe to users changes
export const unsuscribeUsers = async() => {
    // db.collection(collection)
    //     .onSnapshot(function(snapshot) {
    //         //Nothing
    //     });
    if(suscribeFunction!=null){
        suscribeFunction()
        suscribeFunction=null
    }
}