import { firebase, firebaseFirestore } from '.';

import * as actions from '../../logic/actions/orders';
import {store} from '../../../App'
import * as selectors from '../../logic/reducers';
import moment from "moment";
const db = firebaseFirestore;
const collection = "orders";
const collectionSales = "salesByDate";

// Order Status
// 1 Creado
// 2 Entregado
// 2> Cobrado
// 3 No facturado
// 4 Facturado 
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
        

        let orderInfo = {
            ...newOrder,
            status:1,
            orderId,
            dateModified,
        };

        if (isNew) {
            await orderDoc.set(orderInfo);
        } else {
            await orderDoc.update(orderInfo);
        }
        const nOrder = (await db.collection(collection).doc(orderId).get()).data()
        return {
            order: nOrder,
            error: null,
            errorMessage: null
        }

    } catch (error) {
        console.log("ERROR" + error.toString());
        let errorMessage = "No se pudo guardar la orden."
        return {
            errorMessage: errorMessage,
            error,
            order: null
        }
    }
}

// Function to update order status
export const updateOrderStatus = async(order,orderStatus,invoiceInfo={}) => {
    try {
        let { orderId } = order;
        let orderDoc = null;        
        orderDoc = firebase.firestore().collection(collection).doc(orderId);
        orderId = orderDoc.id;
    
        let dateModified = new Date();
       
        let orderInfo = {
            ...order,
            status:orderStatus,
            orderId,
            dateModified,
        };

        
        await orderDoc.update(orderInfo);
        const nOrder = (await db.collection(collection).doc(orderId).get()).data()
        if(orderStatus>3){
            console.log("Date")
            console.log(nOrder.date)
            let saleDateId = moment.unix(nOrder.date.seconds).local();
            let hours = saleDateId.hours()
            saleDateId= saleDateId.format("YYYY-MM-DD")
            console.log(saleDateId)
            let documentSale = await db.collection(collectionSales).doc(saleDateId);
            let documentSaleInfo = (await documentSale.get()).data()
            let {total,branch,user} = nOrder
            let productsOrder = nOrder.products
            let totalWithInvoice=0
            let totalWithoutInvoice=0
            let {byBranch,byTime,byWaiter,products,totalTip,totalWithoutTip,} = documentSaleInfo
            let totalDoc = documentSaleInfo.total
            //Check if it doesnt exist total by branch and byWaiter
            if(byBranch[branch.branchId]==undefined){
                byBranch[branch.branchId]={
                    total:0,
                    totalWithInvoice:0,
                    totalWithoutInvoice:0,
                    totalTip:0,
                }
            }
            if(byWaiter[user.uid]==undefined){
                byWaiter[user.uid]={
                    total:0,
                    totalWithInvoice:0,
                    totalWithoutInvoice:0,
                    totalTip:0,
                }
            }
            //Update by branch and by waiter
            byBranch[branch.branchId].total=byBranch[branch.branchId].total+nOrder.total
            byBranch[branch.branchId].totalWithInvoice=byBranch[branch.branchId].totalWithInvoice+(nOrder.status==5?nOrder.total:0)
            byBranch[branch.branchId].totalWithoutInvoice=byBranch[branch.branchId].totalWithoutInvoice+(nOrder.status==4?nOrder.total:0)
            byBranch[branch.branchId].totalTip=byBranch[branch.branchId].totalTip+nOrder.tip
            byWaiter[user.uid].total=byWaiter[user.uid].total+nOrder.total
            byWaiter[user.uid].totalWithInvoice=byWaiter[user.uid].totalWithInvoice+(nOrder.status==5?nOrder.total:0)
            byWaiter[user.uid].totalWithoutInvoice=byWaiter[user.uid].totalWithoutInvoice+(nOrder.status==4?nOrder.total:0)
            byWaiter[user.uid].totalTip=byWaiter[user.uid].totalTip+nOrder.tip
            //Update by time
            byTime[hours].total=byTime[hours].total+nOrder.total
            byTime[hours].totalWithInvoice=byTime[hours].totalWithInvoice+(nOrder.status==5?nOrder.total:0)
            byTime[hours].totalWithoutInvoice=byTime[hours].totalWithoutInvoice+(nOrder.status==4?nOrder.total:0)
            byTime[hours].totalTip=byTime[hours].totalTip+nOrder.tip
            //Update general totals
            total=totalDoc+nOrder.total+nOrder.tip
            totalWithoutTip=totalWithoutTip+nOrder.total
            totalTip=totalTip+nOrder.tip
            totalWithInvoice=totalWithInvoice+(nOrder.status==5?nOrder.total+nOrder.tip:0)
            totalWithoutInvoice=totalWithoutInvoice+(nOrder.status==4?nOrder.total+nOrder.tip:0)
            productsOrder.forEach(prod=>products.push(prod))
            
            let updatedDocumentSaleInfo={
                ...documentSaleInfo,
                byBranch:{...byBranch},
                byWaiter:{...byWaiter},
                byTime:{...byTime},
                total:total,
                totalWithoutTip: totalWithoutTip,
                totalTip:totalTip,
                totalWithInvoice:totalWithInvoice,
                totalWithoutInvoice:totalWithoutInvoice,  
                products:products             
            }
            documentSale.update(updatedDocumentSaleInfo)
        }
        
        return {
            order: nOrder,
            error: null,
            errorMessage: null
        }

    } catch (error) {
        console.log("ERROR" + error.toString());
        let errorMessage = "No se pudo actualizar el estado de la orden."
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
        var date = new Date();
        date.setHours(0,0,0)
        const orders = await db.collection(collection).where("date", ">=", date).get();
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
export const suscribeOrders = async ()=>{
    var date = new Date();
    date.setHours(0,0,0)
    db.collection(collection).where("date", ">=", date)
        .onSnapshot(function(snapshot) {
            snapshot.docChanges().forEach(function(change) {
                if (change.type === "added") {
                    // console.log("New order: ", change.doc.data());
                    
                    let id=change.doc.id;
                    let docSaved = selectors.getOrder(store.getState(),id)
                    if(docSaved!==null && docSaved!==undefined){
                        console.log("Retrieve order again.")
                    }else{
                        //console.log("New product: ", change.doc.data());
                        store.dispatch(actions.completeAddingOrder({...change.doc.data(),id:change.doc.id}))
                    }
  
                }
                if (change.type === "modified") {
                    store.dispatch(actions.completeEditingOrder({...change.doc.data(),id:change.doc.id}))
                    // console.log("Modified order: ", change.doc.data());
                }
                if (change.type === "removed") {
                    store.dispatch(actions.completeRemovingOrder(change.doc.id))
                    // console.log(change.doc.id)
                    // console.log("Removed order: ", change.doc.data());
                }
            });
        });
  }
  
  //Unsuscribe to Orders changes
  export const unsuscribeOrders = async ()=>{
        await db.collection(collection)
            .onSnapshot(function(snapshot) {});
  }