import * as types from '../types/orders';


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

export const startAddingOrder = (order, data) => ({
    type: types.ORDER_ADD_STARTED,
    payload: {
        order,
        data,
    }
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
    payload: order,
});

export const completeEditingOrder = order => ({
    type: types.ORDER_EDIT_COMPLETED,
    payload: order,
});

export const failEditingOrder = (id, error) => ({
    type: types.ORDER_EDIT_FAILED,
    payload: {
        id,
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

export const addProducts = products => ({
    type: types.ORDER_PRODUCTS_ADDED,
    payload: products
})