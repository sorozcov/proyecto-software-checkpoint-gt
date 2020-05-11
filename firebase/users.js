/* -------------------------------------------------------------------------- */
/*                        Functions for Users Firebase                        */
/* -------------------------------------------------------------------------- */


import { firebaseFirestore,firebaseAuth,firebase } from '.';

const db = firebaseFirestore;

const db = firebaseFirestore;

export const getUsers= async () =>{


    try{
      const users = await db.collection('users').get();
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


//Agregar un usuario
export const addUser= async ({ email, name, lastName, image,userType,restaurantId,userName }) =>{
  
    try {
        //Create Random Password
        let password = randomString();
       
        await firebaseAuth.createUserWithEmailAndPassword(email, password);
        let uid = await firebaseAuth.currentUser.uid;
        image = image !== undefined ? image : null;
        if (image !== null){
          let blob = await uriToBlob(image);
          await uploadToFirebase(blob, uid);
          image = uid;
        }
        
        let newUserDoc = db.collection('users').doc(uid);
        await newUserDoc.set({
            email: email,
            name: name,
            lastName: lastName,
            uid: uid,
            image: image,
            userType:userType,
            userId:userId,
            userName:userName
        });
        //Enviar correo para resetear password al gusto del mesero
        await firebaseAuth.sendPasswordResetEmail(email);
        
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

      }
    }


export const createUser= async (user) =>{
  
    const newUser = firebaseFirestore.collection('users').doc();
    const uid = newUser.id; 
    newUser.set(user);
    return id;
}

export const editUser= async (user) =>{
  
    const newUser = firebaseFirestore.collection('users').doc(user.userid);
    newUser.update(user);
    return true;
}



const uriToBlob = (uri) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        // return the blob
        resolve(xhr.response);
      };
      
      xhr.onerror = function() {
        // something went wrong
        reject(new Error('uriToBlob failed'));
      };
      // this helps us get a blob
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      
      xhr.send(null);
    });
  }
  
  
const uploadToFirebase = (blob,uid) => {
    return new Promise((resolve, reject)=>{
      let storageRef = firebase.storage().ref();
      let img = "UserImages/" + uid+'.jpg';
      storageRef.child(img).put(blob, {
        contentType: 'image/jpeg'
      }).then((snapshot)=>{
        blob.close();
        resolve(snapshot);
      }).catch((error)=>{
        reject(error);
      });
    });
  }
