import { put, takeEvery } from 'redux-saga/effects';
import { deleteProduct, getProducts, updateProduct } from '../../database/firebase/products';
import * as actions from '../../logic/actions/products';
import * as types from '../types/products';



function* productsFetchStarted(action) {
    try {
        const result = yield getProducts();

        yield put(actions.completeFetchingProducts(result.products.byId, result.products.order));
    } catch (error) {
        console.log("Falló el fetch de productos")
        console.log(error);
        yield put(actions.failFetchingProducts('Falló el fetch'))
    }
}

export function* watchProductsFetchStarted(){
    yield takeEvery(
        types.PRODUCTS_FETCH_STARTED,
        productsFetchStarted,
    );
}

function* addProduct(action) {
    try {
        var product = action.payload;
        const response = yield updateProduct(product);
        if (response.error == null) {
            yield put(actions.completeAddingProduct(response.product));
        } else {
            yield put(actions.failAddingProduct(response.error));
        }
    } catch (error) {
        console.log(error)
        yield put(actions.failAddingProduct('Falló al crear el producto'));
    }
}

export function* watchAddProductsStarted() {
    yield takeEvery(
        types.PRODUCT_ADD_STARTED,
        addProduct,
    );
}

function* editProduct(action) {
    try {
        var product = action.payload;
        const response = yield updateProduct(product);
        
        if (response.error == null) {
            yield put(actions.completeEditingProduct(response.product));
        } else {
            yield put(actions.failEditingProduct(response.error));
        }
    } catch (error) {
        yield put(actions.failEditingProduct('Falló al editar el producto'));
    }
}

export function* watchEditProductsStarted() {
    yield takeEvery(
        types.PRODUCT_EDIT_STARTED,
        editProduct,
    );
}

function* deleteProductStarted(action){
    try {
        const deleted = yield deleteProduct(action.payload)
        yield put(actions.completeRemovingProduct(deleted.productId))
    } catch (error) {
        yield put(actions.failRemovingProduct(action.payload.productId, 'Falló el remove de producto'))
    }
}

export function* watchDeleteProductStarted() {
    yield takeEvery(
        types.PRODUCT_REMOVE_STARTED,
        deleteProductStarted,
    )
}