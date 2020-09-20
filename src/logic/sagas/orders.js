import { put, takeEvery } from 'redux-saga/effects';
import { getOrders, updateOrder, deleteOrder } from '../../database/firebase/orders';
import * as actions from '../../logic/actions/orders';
import * as types from '../types/orders';



function* makeOrder(action) {
    try {
        const order = action.payload;
        const response = yield updateOrder(order);

        if (response.error == null) {
            yield put(actions.completeAddingOrder(response.order));
        } else {
            yield put(actions.failAddingOrder(response.error));
        }
    } catch (error) {
        console.log(error);
        yield put(actions.failAddingOrder('Falló la creación del pedido'));
    }
}

export function* watchAddOrderStarted() {
    yield takeEvery(
        types.ORDER_ADD_STARTED,
        makeOrder,
    );
}

function* editOrder(action) {
    try {
        const order = action.payload;
        const response = yield updateOrder(order);

        if (response.error == null) {
            yield put(actions.completeEditingOrder(response.order));
        } else {
            yield put(actions.failEditingOrder(response.error));
        }
    } catch (error) {
        console.log(error);
        yield put(actions.failAddingOrder('Falló la creación del pedido'));
    }
}

export function* watchEditOrderStarted() {
    yield takeEvery(
        types.ORDER_EDIT_STARTED,
        editOrder,
    );
}

function* fetchOrders(action) {
    try {
        const response = yield getOrders();
        console.log(response);
        yield put(actions.completeFetchingOrders(response.orders.byId, response.orders.order));
    } catch (error) {
        yield put(actions.failFetchingOrders(response.error));
    }
}

export function* watchOrdersFetch() {
    yield takeEvery(
        types.ORDERS_FETCH_STARTED,
        fetchOrders,
    );
}

function* removeOrder(action) {
    try {
        const order = action.payload;
        const response = yield deleteOrder(order);

        yield put(actions.completeRemovingOrder(response.orderId));
    } catch (error) {
        yield put(actions.failRemovingOrder(action.payload.orderId, "Falló el remove de órden"));
    }
}

export function* watchRemoveOrder() {
    yield takeEvery(
        types.ORDER_REMOVE_STARTED,
        removeOrder,
    );
}