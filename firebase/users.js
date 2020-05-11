/* -------------------------------------------------------------------------- */
/*                        Functions for Users Firebase                        */
/* -------------------------------------------------------------------------- */


import { firebaseFirestore,firebaseAuth,firebase } from '.';
import randomString from 'random-string'
import { uploadImageToFirebase } from './images';

const db = firebaseFirestore;
const collection = "users";

//Obtener usuarios de firebase
export const getUsers= async () =>{


    try{
      const users = await db.collection(collection).get();
    let usersArray = [];
    await users.docs.forEach(user => {
        usersArray.push(user.data());
    });

    let usersNormalizer = {};
    let userById = {};

    usersNormalizer['order'] = usersArray.map(user => user.uid)
    usersArray.map((user) => {userById[user.uid] = user})
    usersNormalizer['byId'] = userById;
    usersNormalizer['array'] = usersArray;

    return {users:usersNormalizer,error:null};
  } catch(error){
    return {
      users: null,
      error
    }
  }

}


//Agregar un usuario o editar un usuario. Si el usuario se editar enviar uid null o no enviar.
export const updateUser= async ({ uid=null,email, name, lastName, image,userTypeId,userTypeName,restaurantId,restaurantName }) =>{
    try {

      let userDoc = null;
      let isNew = uid==null;
      if(isNew){
        //Create Random Password for User to change with the email confirmation
        let password = randomString();
        //Create firebase user with firebaseAuth
        await firebaseAuth.createUserWithEmailAndPassword(email, password);
        uid = await firebaseAuth.currentUser.uid;
      }
      userDoc = await firebaseFirestore.collection(collection).doc(uid);
      uid = userDoc.id;

      let dateModified = new Date();
      dateModified = dateModified.getTime();

      if(inNew){
        //Creamos el documento del usuario
        await userDoc.set({
            email: email,
            name: name,
            lastName: lastName,
            uid: uid,
            image: image,
            userTypeName:userTypeName,
            userTypeId:userTypeId,
            restaurantId:restaurantId,
            restaurantName:restaurantName,
            dateModified:dateModified
        });
        //Vemos si necesita subir una imagen
        image = image !== undefined ? image : null;
        if (image !== null){
          let uploadImg = await uploadImageToFirebase(uri,uid,"UserImages");
          if(!uploadImg.uploaded){
            //Error subiendo imagen
            console.log(uploadImg.error);
          }
          image = uid;
        }
        //Enviar correo para resetear password al gusto del mesero
        await firebaseAuth.sendPasswordResetEmail(email);
      }else{
        
        //Vemos si necesita hacer update de la imagen
        //Vemos si necesita subir una imagen
        image = image !== undefined ? image : null;
        if (image !== null){
          if(image!=userDoc.data().image){
            let uploadImg = await uploadImageToFirebase(uri,uid,"UserImages");
            if(!uploadImg.uploaded){
              //Error subiendo imagen
              console.log(uploadImg.error);
            }
            
          }
          image = uid;
          
        }
        
        //Hacemos update al documento del usuario
        await userDoc.update({
          email: email,
          name: name,
          lastName: lastName,
          uid: uid,
          image: image,
          userTypeName:userTypeName,
          userTypeId:userTypeId,
          restaurantId:restaurantId,
          restaurantName:restaurantName,
          dateModified:dateModified
        });

      }
      return{user:userDoc.data(),error:null,errorMessage:null}
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
        return{user:null,error,errorMessage}
    }
  }

//Funcion para eliminar un usuario.
export const deleteUser = async ({uid})=>{
  try {

      let userDoc = await firebaseFirestore.collection(collection).doc(uid);
      userDoc = await userDoc.delete();
      return { uid:uid,error:null,errorMessage:null}
    } catch (error) {
      console.log("ERROR" + error.toString());
      let errorMessage = "No se pudo eliminar el usuario."
      return {errorMessage:errorMessage,error,uid=null}
    }

}
