/* -------------------------------------------------------------------------- */
/*                        Functions for Product Firebase                        */
/* -------------------------------------------------------------------------- */


import { firebase, firebaseFirestore } from '.';
import { uploadImageToFirebase } from './images';
import * as actions from '../../logic/actions/products';
import {store} from '../../../App'
import * as selectors from '../../logic/reducers';
const db = firebaseFirestore;
const collection = "products";
var suscribeFunction = null;
import uuid from 'react-native-uuid';

//Funcion para obtener Products de Firebase
export const getProducts= async () =>{
    try{
        const products = await db.collection(collection).get();
    
        let productsArray = [];
        await products.docs.forEach(product => {
            productsArray.push(product.data());
        });
        
        let productsNormalizer = {};
        let productById = {};
    
        productsNormalizer['order'] = productsArray.map(product => product.productId)
        productsArray.map((product) => {productById[product.productId] = product})
        productsNormalizer['byId'] = productById;
        productsNormalizer['array'] = productsArray;
        
        return {products:productsNormalizer,error:null};
    }catch(error){
        return {products:null,error}
    }
}

//Funcion para crear o hacer update de un Product
//Si es nuevo enviar productId=null o no enviar
export const updateProduct = async ({productId=null,productName,description,category,categoryId,price,image, additionals = [], ingredients = [], status=1})=>{
    try {

        let productDoc = null;
        let isNew = productId==null;
        let imageUid = uuid.v1()
        let idk={}
        if(isNew){
          
          productDoc = await firebaseFirestore.collection(collection).doc();
          productId = productDoc.id;
          
        } else {
          productDoc = await firebase.firestore().collection(collection).doc(productId);
          productId = productDoc.id;
          idk = await firebaseFirestore.collection(collection).doc(productId).get()
          idk = idk.data()
        }
        
        //Vemos si necesita hacer update de la imagen
        //Vemos si necesita subir una imagen
        image = image !== undefined ? image : null;
        if (image !== null){
          if(isNew || !image.includes(idk.image)){
            if(!isNew){
              try{
                
                await firebase.storage().ref("ProductImages/" + idk.image + '.jpg').delete();
                await firebase.storage().ref("ProductImages/" + idk.image + '_200x200.jpg').delete();
                await firebase.storage().ref("ProductImages/" + idk.image + '_400x400.jpg').delete();
                await firebase.storage().ref("ProductImages/" + idk.image + '_600x600.jpg').delete();
              }catch(error){
                console.log("Error eliminando imagenes.")
              }
            }
            let uploadImg = await uploadImageToFirebase(image,imageUid,"ProductImages");
            if(!uploadImg.uploaded){
              //Error subiendo imagen
              console.log(uploadImg.error);
            }
            image = imageUid;
          }
          
          
        }
 
        let dateModified = new Date();
        dateModified = dateModified.getTime();
        let productInfo = {
            productId: productId, 
            productName: productName,
            description: description,
            category: category,
            categoryId: categoryId,
            price: parseFloat(price).toFixed(2),
            image: image,
            status: status,
            dateModified: dateModified,
            additionals,
            ingredients,
          };
        if(isNew){
          await productDoc.set(productInfo);
        } else {
          await productDoc.update(productInfo);
        }
        return { product:productInfo,error:null,errorMessage:null}
  
      } catch (error) {
        console.log("ERROR" + error.toString());
        let errorMessage = "No se pudo guardar el producto."
        return {errorMessage:errorMessage,error,product:null}
      }

}

//Funcion para eliminar un producto.
export const deleteProduct = async ({productId})=>{
    try {

        let productDoc = await firebaseFirestore.collection(collection).doc(productId);
        productDoc = await productDoc.delete();
        return { productId:productId,error:null,errorMessage:null}
      } catch (error) {
        console.log("ERROR" + error.toString());
        let errorMessage = "No se pudo eliminar el producto."
        
        return {errorMessage:errorMessage,error,productId:null}
      }

}


//Suscribe to Products changes
export const suscribeProducts = async ()=>{
  suscribeFunction = db.collection(collection)
      .onSnapshot(function(snapshot) {
          snapshot.docChanges().forEach(function(change) {
              if (change.type === "added") {
                  // console.log("New product: ", change.doc.data());
                  let id=change.doc.id;
                  let docSaved = selectors.getProduct(store.getState(),id)
                  if(docSaved!==null && docSaved!==undefined){
                    console.log("Retrieve product again.")
                  }else{
                    //console.log("New product: ", change.doc.data());
                    store.dispatch(actions.completeAddingProduct({...change.doc.data(),id:change.doc.id}))
                  }
                  

              }
              if (change.type === "modified") {
                  store.dispatch(actions.completeEditingProduct({...change.doc.data(),id:change.doc.id}))
                  // console.log("Modified product: ", change.doc.data());
              }
              if (change.type === "removed") {
                  store.dispatch(actions.completeRemovingProduct(change.doc.id))
                  // console.log(change.doc.id)
                  // console.log("Removed product: ", change.doc.data());
              }
          });
      });
}

//Unsuscribe to Products changes
export const unsuscribeProducts = async ()=>{
  // db.collection(collection)
  //   .onSnapshot(function() {
  //     //Nothing
  //   });
  if(suscribeFunction!=null){
    suscribeFunction()
    suscribeFunction=null
  }
}