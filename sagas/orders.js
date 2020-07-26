import {
    takeEvery,
    put,
} from 'redux-saga/effects';

import * as actions from '../src/actions/orders';
import * as types from '../src/types/orders';

import { updateOrder, getOrders } from '../firebase/orders';

function* makeOrder(action) {
    try {
        const { order, data } = action.payload;
        const response = yield updateOrder({...data, products: order });

        console.log(response)
            // if (response.error == null) {
            //     yield put(actions.completeAddingOrder(response.order));
            // } else {
            //     yield put(actions.failAddingOrder(response.error));
            // }
    } catch (error) {
        console.log(error)
        yield put(actions.failAddingOrder('Falló la creación del pedido'));
    }
}

export function* watchAddOrderStarted() {
    yield takeEvery(
        types.ORDER_ADD_STARTED,
        makeOrder,
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