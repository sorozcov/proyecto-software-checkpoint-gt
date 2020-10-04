import * as types from '../types/orders';


export const clearOrders = () => ({
    type: types.ORDERS_CLEARED,
});

export const startFetchingOrders = () => ({
    type: types.ORDERS_FETCH_STARTED,
});

export const completeFetchingOrders = (entities, order) => ({
    type: types.ORDERS_FETCH_COMPLETED,
    payload: {
        entities,
        order,
    },
});

export const failFetchingOrders = error => ({
    type: types.ORDERS_FETCH_FAILED,
    payload: {
        error,
    },
});

export const startAddingOrder = order => ({
    type: types.ORDER_ADD_STARTED,
    payload: order
});

export const completeAddingOrder = order => ({
    type: types.ORDER_ADD_COMPLETED,
    payload: order,
});

export const failAddingOrder = error => ({
    type: types.ORDER_ADD_FAILED,
    payload: {
        error,
    },
});

export const startEditingOrder = order => ({
    type: types.ORDER_EDIT_STARTED,
    payload: order
});

export const completeEditingOrder = order => ({
    type: types.ORDER_EDIT_COMPLETED,
    payload: order,
});

export const failEditingOrder = error => ({
    type: types.ORDER_EDIT_FAILED,
    payload: {
        error,
    },
});

export const startRemovingOrder = orderId => ({
    type: types.ORDER_REMOVE_STARTED,
    payload: {
        orderId,
    },
});

export const completeRemovingOrder = orderId => ({
    type: types.ORDER_REMOVE_COMPLETED,
    payload: {
        orderId,
    },
});

export const failRemovingOrder = (orderId, error) => ({
    type: types.ORDER_REMOVE_FAILED,
    payload: {
        orderId,
        error,
    },
});

export const activateOrder = order => ({
    type: types.ORDER_ACTIVATED,
    payload: order,
});

export const deactivateOrder = () => ({
    type: types.ORDER_DEACTIVATED,
});

export const addProductToOrder = product => ({
    type: types.ORDER_PRODUCT_ADDED,
    payload: product
});

export const editProductOfOrder = product => ({
    type: types.ORDER_PRODUCT_EDITED,
    payload: product,
});

export const deleteProductOfOrder = index => ({
    type: types.ORDER_PRODUCT_DELETED,
    payload: index
});

export const activateNewOrder = order => ({
    type: types.NEW_ORDER_ACTIVATED,
    payload: order,
});

export const deactivateNewOrder = () => ({
    type: types.NEW_ORDER_DEACTIVATED,
});

export const addProductToNewOrder = product => ({
    type: types.NEW_ORDER_PRODUCT_ADDED,
    payload: product
});

export const editProductOfNewOrder = product => ({
    type: types.NEW_ORDER_PRODUCT_EDITED,
    payload: product,
});

export const deleteProductOfNewOrder = index => ({
    type: types.NEW_ORDER_PRODUCT_DELETED,
    payload: index
});