/* -------------------------------------------------------------------------- */
/*              Funciones para subir imagenes a Firebase Storage              */
/* -------------------------------------------------------------------------- */
import { firebaseStorage } from '.';

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
  
  
const uploadToFirebase = (blob,id,imagePath) => {
    return new Promise((resolve, reject)=>{
      let storageRef = firebaseStorage.ref();
      let img = imagePath +"/" + id+'.jpg';
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

export const uploadImageToFirebase = async(uri,id,imagePath)=>{
    try{
        blob = await uriToBlob(uri);
        uploadImage = await uploadToFirebase(blob,id,imagePath);
        return{error:null,uploaded:true};
    }catch(error){
        return{error,uploaded:false};
    }
}