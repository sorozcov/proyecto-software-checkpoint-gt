import { put, takeEvery, select } from 'redux-saga/effects';
import { deleteProduct, getProducts, updateProduct } from '../../database/firebase/products';
import * as actions from '../../logic/actions/products';
import * as selectors from '../../logic/reducers';
import * as types from '../types/products';
import { suscribeFirebase } from '../../../config';



function* productsFetchStarted(action) {
    try {
        const result = yield getProducts();
        if(!suscribeFirebase){
            yield put(actions.completeFetchingProducts(result.products.byId, result.products.order));
        }
    } catch (error) {
        console.log("Falló el fetch de productos")
        console.log(error);
        yield put(actions.failFetchingProducts('Falló el fetch'))
    }
}

export function* watchProductsFetchStarted() {
    yield takeEvery(
        types.PRODUCTS_FETCH_STARTED,
        productsFetchStarted,
    );
}

function* addProduct(action) {
    try {
        const newProduct = action.payload;

        const response = yield updateProduct(newProduct);
        if (response.error == null)
            if(!suscribeFirebase){
                yield put(actions.completeAddingProduct(response.product));
            }

        else
            yield put(actions.failAddingProduct(response.error));

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
            if(!suscribeFirebase){
                yield put(actions.completeEditingProduct(response.product));
            }
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

function* deleteProductStarted(action) {
    try {
        const deleted = yield deleteProduct(action.payload)
        if(!suscribeFirebase){
            yield put(actions.completeRemovingProduct(deleted.productId))
        }
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

// function* addIngredient(action) {
//     try {
//         let ingredient = action.payload;
//         const selectedProduct = yield select(selectors.getSelectedProduct)
//         var product = {}
//         if(ingredient.additionalInfo){
//             product = {
//                 ...selectedProduct,
//                 additionals: selectedProduct['additionals'] === undefined ? [ingredient.additionalInfo] : [...selectedProduct['additionals'], ingredient.additionalInfo]
//             }
//         }else {
//             product = {
//                 ...selectedProduct,
//                 ingredients: selectedProduct['ingredients'] === undefined ? [ingredient.ingredientInfo] : [...selectedProduct['ingredients'], ingredient.ingredientInfo]
//             }
//         }
//         const response = yield updateProduct(product);

//         if (response.error == null) {
//             yield put(actions.completeAddingIngredient(response.product));
//         } else {
//             yield put(actions.failAddingIngredient(response.error));
//         }
//     } catch (error) {
//         yield put(actions.failAddingIngredient('Falló al agregar ingrediente'));
//     }
// }

// export function* watchAddIngredientStarted() {
//     yield takeEvery(
//         types.PRODUCT_INGREDIENT_ADD_STARTED,
//         addIngredient,
//     );
// }

// function* editIngredient(action) {
//     try {
//         let ingredient = action.payload;
//         var selectedProduct = yield select(selectors.getSelectedProduct)
//         if(ingredient.additionalId != null){
//             selectedProduct['additionals'][ingredient.additionalId] = {
//                 ...selectedProduct['additionals'][ingredient.additionalId], 
//                 default: !selectedProduct['additionals'][ingredient.additionalId].default 
//             };
//         }else {
//             selectedProduct['ingredients'][ingredient.ingredientId] = {
//                 ...selectedProduct['ingredients'][ingredient.ingredientId], 
//                 default: !selectedProduct['ingredients'][ingredient.ingredientId].default 
//             };
//         }
//         const response = yield updateProduct(selectedProduct);

//         if (response.error == null) {
//             yield put(actions.completeEditingIngredient(response.product));
//         } else {
//             yield put(actions.failEditingIngredient(response.error));
//         }
//     } catch (error) {
//         yield put(actions.failEditingIngredient('Falló al agregar ingrediente'));
//     }
// }

// export function* watchEditIngredientStarted() {
//     yield takeEvery(
//         types.PRODUCT_INGREDIENT_EDIT_STARTED,
//         editIngredient,
//     );
// }