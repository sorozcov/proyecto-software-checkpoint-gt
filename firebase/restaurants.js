/* -------------------------------------------------------------------------- */
/*                        Functions for Restaurants Firebase                        */
/* -------------------------------------------------------------------------- */


import { firebaseFirestore,firebaseAuth,firebase } from '.';


const db = firebaseFirestore;
const collection = "restaurants";

//Funcion para obtener Restaurants de Firebase
export const getRestaurants= async () =>{
    try{
        const restaurants = await db.collection(collection).get();
    
        let restaurantsArray = [];
        await restaurants.docs.forEach(restaurant => {
            restaurantsArray.push(restaurant.data());
        });
        let restaurantsNormalizer = {};
        let restaurantById ={};
        restaurantNormalizer['byOrder']=restaurantsArray.map((restaurant)=>{restaurant.restaurantId})
        restaurantsArray.map((restaurant)=>{restaurantById[restaurant.restaurantId]=restaurant})
        restaurantNormalizer['byId']=restaurantById;
        restaurantsArrayNormalizer['array']=restaurantsArray;
        return {restaurants:restaurantsNormalizer,error:null};
    }catch(error){
        return {restaurants:null,error}
    }
}

//Funcion para crear o hacer update de un Restaurant
//Si es nuevo enviar restaurantId=null o no enviar
export const updateRestaurant = async ({restaurantId,restaurantName,address,zone})=>{
    try {

        let restaurantDoc = null;
        let isNew = restaurantId==null;
        if(isNew){
          restaurantDoc = await firebaseFirestore.collection(collection).doc();
          restaurantId = restaurantDoc.id;
        } else {
          restaurantDoc = await firebase.firestore().collection(collection).doc(restaurantId);
          restaurantId = restaurantDoc.id;
        }
  
 
        let dateModified = new Date();
        dateModified = dateModified.getTime();
        let restaurantInfo = {
            restaurantId: restaurantId, 
            restaurantName: restaurantName,
            address:address,
            zone:zone,
            dateModified:dateModified
          };
        if(isNew){
          await restaurantDoc.set(restaurantInfo);
        } else {

          await restaurantDoc.update(restaurantInfo);
        }
        return { restaurant:restaurantDoc.data(),error:null,errorMessage:null}
  
      } catch (error) {
        console.log("ERROR" + error.toString());
        let errorMessage = "No se pudo guardar la categoría."
        return {errorMessage:errorMessage,error,restaurant=null}
      }

}

//Funcion para eliminar una categoria.
export const deleteRestaurant = async ({restaurantId})=>{
    try {

        let restaurantDoc = await firebaseFirestore.collection(collection).doc(restaurantId);
        restaurantDoc = await restaurantDoc.delete();
        return { restaurantId:restaurantId,error:null,errorMessage:null}
      } catch (error) {
        console.log("ERROR" + error.toString());
        let errorMessage = "No se pudo eliminar la categoría."
        return {errorMessage:errorMessage,error,restaurantId=null}
      }

}
