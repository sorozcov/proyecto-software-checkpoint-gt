import {
    //call,
    takeEvery,
    put,
    //delay,
    //select,
} from 'redux-saga/effects';

import { 
    getProductCategories, 
    createProductCategory 
} from '../firebase/categories';

import * as selectors from '../src/reducers';
import * as actions from '../src/actions/categories';
import * as types from '../src/types/categories';
import categories from '../src/reducers/categories';

function* fetchCategories(action) {
    try {
        const productCategories = getProductCategories();
        
        const entities = {};
        const order = [productCategories.map(category => category.uid)];

        yield put(actions.completeFetchingCategories(entities, order));
    } catch(error) {
        yield put(actions.failFetchingCategories('Ha ocurrido un error haciendo fetch a las categorias'));
    }
}

function* addCategory(action) {
    try {
        const category = action.payload;
        const uid = createProductCategory(category);

        if(uid) {
            yield put(actions.completeAddingCategory(action.payload.id, category));
        } else {
            yield put(actions.failAddingCategory('Ha ocurrido un error añadiendo la categoría'));
        }
    } catch(error) {
        yield put(actions.failAddingCategory('Ha ocurrido un error añadiendo la categoría'));
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