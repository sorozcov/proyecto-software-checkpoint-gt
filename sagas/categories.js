import {
    //call,
    takeEvery,
    put,
    //delay,
    //select,
} from 'redux-saga/effects';

import { 
    getCategories,
    updateCategory,
    deleteCategory, 
} from '../firebase/categories';

import * as selectors from '../src/reducers';
import * as actions from '../src/actions/categories';
import * as types from '../src/types/categories';
import categories from '../src/reducers/categories';

function* fetchCategories(action) {
    try {
        const result = yield getCategories();

        yield put(actions.completeFetchingCategories(result.categories.byId, result.categories.order));
    } catch (error) {
        yield put(actions.failFetchingCategories('Falló al obtener categorías'));
    }
}

function* addCategory(action) {
    try {
        var category = action.payload.category;
        const response = yield updateCategory(category);

        if (response.error == null) {
            yield put(actions.completeAddingCategory(response.category));
        } else {
            yield put(actions.failAddingCategory(response.error));
        }
    } catch (error) {
        yield put(actions.failAddingCategory('Falló al crear la categoría'));
    }
}

function* removeCategory(action) {
    //  FALTA VERIFICAR SI ESTA CATEGORÍA ES PARTE DE UN PRODUCTO
    //  ESTO SE HARÁ ANTES DE ENTRAR AL TRY - CATCH
    try {
        var category = action.payload;
        const response = yield deleteCategory(category);

        yield put(actions.completeRemovingCategory(response.categoryId));
    } catch(error) {
        yield put(actions.failRemovingCategory('Falló al eliminar categoría'));
    }
}

function* editCategory(action) {
    try {
        var category = action.payload;
        const response = yield updateCategory(category);

        if(response.error == null) {
            yield put(actions.completeEditingCategory(response.category));
        } else {
            yield put(actions.failEditingCategory('Falló al editar categoría'));
        }
    } catch(error) {
        yield put(actions.failEditingCategory('Falló al editar categoría'));
    }
}

export function* watchFetchCategories() {
    yield takeEvery(
        types.CATEGORIES_FETCH_STARTED,
        fetchCategories,
    );
};

export function* watchAddCategory() {
    yield takeEvery(
        types.CATEGORY_ADD_STARTED,
        addCategory,
    );
};

export function* watchRemoveCategory() {
    yield takeEvery(
        types.CATEGORY_REMOVE_STARTED,
        removeCategory,
    );
};

export function* watchEditCategory() {
    yield takeEvery(
        types.CATEGORY_EDIT_STARTED,
        editCategory,
    );
};