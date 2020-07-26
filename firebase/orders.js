import { firebaseFirestore, firebaseAuth, firebase } from '.';


const db = firebaseFirestore;
const collection = "orders";

// Funcion para crear o hacer update de un pedido
// Si es nuevo enviar orderId = null o no enviar
export const updateOrder = async({ orderId, name, fecha, products }) => {
    try {
        let orderDoc = null;
        let isNew = orderId == null;

        if (isNew) {
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

        if (isNew) {
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

//Función para obtener ordenes de Firebase
export const getOrders = async() => {
    try {
        const orders = await db.collection(collection).get();
        let ordersArray = [];
        orders.docs.forEach(order => {
            ordersArray.push(order.data());
        });
        let ordersNormalizer = {};
        let orderById = {};

        ordersNormalizer['order'] = ordersArray.map(order => order.id);
        ordersArray.map((order) => { orderById[order.id] = order })
        ordersNormalizer['byId'] = orderById;
        ordersNormalizer['array'] = ordersArray;

        return {
            orders: ordersNormalizer,
            error: null,
        };

    } catch (error) {
        return {
            orders: null,
            error,
        };
    }
}