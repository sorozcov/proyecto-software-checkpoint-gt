import {
    //call,
    takeEvery,
    put,
    //delay,
    //select,
} from 'redux-saga/effects';

import { 
    getCategories,
    updateCategory 
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
        yield put(actions.failFetchingCategories('Ha ocurrido un error haciendo fetch a las categorias'));
    }
}

function* addCategory(action) {
    try {
        var categories = action.payload;
        const response = yield updateCategory(categories);
        if (response.error == null) {
            yield put(actions.completeAddingCategory(response.category));
        } else {
            yield put(actions.failAddingCategory(response.error));
        }
    } catch (error) {
        yield put(actions.failAddingCategory('Falló al crear la categoría'));
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