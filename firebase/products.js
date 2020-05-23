/* -------------------------------------------------------------------------- */
/*                        Functions for Product Firebase                        */
/* -------------------------------------------------------------------------- */


import { firebaseFirestore,firebaseAuth,firebase } from '.';


const db = firebaseFirestore;
const collection = "products";

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
    
        productsNormalizer['order'] = productsArray.map(product => product.uid)
        productsArray.map((product) => {productById[product.uid] = product})
        productsNormalizer['byId'] = productById;
        productsNormalizer['array'] = productsArray;
        
        return {products:productsNormalizer,error:null};
    }catch(error){
        return {products:null,error}
    }
}

//Funcion para crear o hacer update de un Product
//Si es nuevo enviar productId=null o no enviar
export const updateProduct = async ({productId,productName,description,category,categoryId,price})=>{
    try {

        let productDoc = null;
        let isNew = productId==null;
        if(isNew){
          productDoc = await firebaseFirestore.collection(collection).doc();
          productId = productDoc.id;
        } else {
          productDoc = await firebase.firestore().collection(collection).doc(productId);
          productId = productDoc.id;
        }
  
 
        let dateModified = new Date();
        dateModified = dateModified.getTime();
        let productInfo = {
            productId: productId, 
            productName: productName,
            description:description,
            category:category,
            categoryId:categoryId,
            price:price,
            dateModified:dateModified
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
