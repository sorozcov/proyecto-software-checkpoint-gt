import { firebase, firebaseFirestore } from '.';


const db = firebaseFirestore;
const collection = "orders";

// Funcion para crear o hacer update de un pedido
// Si es nuevo enviar orderId = null o no enviar
export const updateOrder = async({ orderId, name, fecha, total, products }) => {
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
            total: total,
            products: products,
            dateModified: dateModified,
        };

        if (isNew) {
            await orderDoc.set(orderInfo);
        } else {
            await orderDoc.update(orderInfo);
        }
        const order = await (await db.collection(collection).doc(orderId).get()).data()
        return {
            order: order,
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
            order.data().date = order.data().date.toDate();
            // console.log(order.data().date.toDate());
            ordersArray.push(order.data());
        });
        let ordersNormalizer = {};
        let orderById = {};

        ordersNormalizer['order'] = ordersArray.map(order => order.orderId);
        ordersArray.map((order) => { orderById[order.orderId] = order });
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