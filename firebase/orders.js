import { firebaseFirestore, firebaseAuth, firebase } from '.';


const db = firebaseFirestore;
const collection = "orders";

// Funcion para crear o hacer update de un pedido
// Si es nuevo enviar orderId = null o no enviar
export const updateOrder = async ({ orderId, name, fecha, products }) => {
    try {
        let orderDoc = null;
        let isNew = orderId == null;

        if(isNew){
            orderDoc = firebaseFirestore.collection(collection).doc();
            orderId = orderDoc.id;
        } else {
            orderDoc = firebase.firestore().collection(collection).doc(orderId);
            orderId = orderDoc.id;
        }
  
        let dateModified = new Date();
        dateModified = dateModified.getTime();

        let orderInfo = {
            orderId: orderId, 
            orderName: name,
            date: fecha,
            products: products,
            dateModified: dateModified,
        };

        if(isNew) {
            await orderDoc.set(orderInfo);
        } else {
            await orderDoc.update(orderInfo);
        }

        return { 
            order: orderInfo, 
            error: null, 
            errorMessage: null 
        }
  
      } catch (error) {
            console.log("ERROR" + error.toString());
            let errorMessage = "No se pudo guardar el producto."
            return {
                errorMessage: errorMessage,
                error,
                order: null
            }
      }
}