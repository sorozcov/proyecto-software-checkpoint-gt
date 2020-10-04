import { firebase, firebaseFirestore } from '.';
import * as actions from '../../logic/actions/orders';
import { store } from '../../../App'
import * as selectors from '../../logic/reducers';
const db = firebaseFirestore;
const collection = "orders";

// Funcion para crear o hacer update de un pedido
// Si es nuevo enviar orderId = null o no enviar
export const updateOrder = async(newOrder) => {
    try {
        let { orderId } = newOrder;
        let orderDoc = null;
        let isNew = orderId == null;

        if (isNew) {
            console.log('Nuevo')
            orderDoc = firebaseFirestore.collection(collection).doc();
            orderId = orderDoc.id;
            let dateCreated = new Date();
            newOrder.date = dateCreated;
        } else {
            console.log('No-Nuevo')
            orderDoc = firebase.firestore().collection(collection).doc(orderId);
            orderId = orderDoc.id;
        }

        let dateModified = new Date();
        dateModified = dateModified.getTime();

        let orderInfo = {
            ...newOrder,
            orderId,
            dateModified,
        };

        if (isNew) {
            await orderDoc.set(orderInfo);
        } else {
            await orderDoc.update(orderInfo);
        }
        const order = (await db.collection(collection).doc(orderId).get()).data()
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

//  Funcion para eliminar órdenes de Firebase
export const deleteOrder = async({ orderId }) => {
    try {
        let orderDoc = db.collection(collection).doc(orderId);
        orderDoc = await orderDoc.delete();
        return {
            orderId: orderId,
            error: null,
            errorMessage: null,
        };

    } catch (error) {
        console.log("ERROR" + error.toString());
        let errorMessage = "No se pudo eliminar esta órden";
        return {
            errorMessage: errorMessage,
            error,
            orderId: null
        };
    };
}


//Suscribe to Orders changes
export const suscribeOrders = () => {
    let userBranch = selectors.getLoggedUser(store.getState());

    return unsuscribeOrders = db.collection(collection).where('branchId', '==', `${userBranch.restaurantId}`)
        .onSnapshot(function(snapshot) {
            snapshot.docChanges().forEach(function(change) {
                if (change.type === "added") {
                    // console.log("New order: ", change.doc∂.data());

                    let id = change.doc.id;
                    let docSaved = selectors.getOrder(store.getState(), id);
                    if (docSaved !== null && docSaved !== undefined) {
                        console.log("Retrieve order again.");
                    } else {
                        //console.log("New product: ", change.doc.data());
                        store.dispatch(actions.completeAddingOrder({...change.doc.data(), id: change.doc.id }));
                    }
                }
                if (change.type === "modified") {
                    store.dispatch(actions.completeEditingOrder({...change.doc.data(), id: change.doc.id }));
                    // console.log("Modified order: ", change.doc.data());
                }
                if (change.type === "removed") {
                    store.dispatch(actions.completeRemovingOrder(change.doc.id));
                    // console.log(change.doc.id)
                    // console.log("Removed order: ", change.doc.data());
                }
            });
        });
}

//Unsuscribe to Orders changes
export const unsuscribeOrders = () => {
    db.collection(collection)
        .onSnapshot(function(snapshot) {
            store.dispatch(actions.clearOrders());
        });
}