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
        console.log('entra?')
        const result = yield getCategories();
        const { byId, order } = result;
        
        yield put(actions.completeFetchingCategories(byId, order));
    } catch (error) {
        yield put(actions.failFetchingCategories('Ha ocurrido un error haciendo fetch a las categorias'));
    }
}

// function* addCategory(action) {
//     try {
//         const category = action.payload.;

//         newCategory = updateCategory(null, category);

//         id = newCategory
//     } catch(error) {
//         yield put(actions.failAddingCategory('Ha ocurrido un error añadiendo la categoría'));
//     }
// }

export function* watchFetchCategories() {
    yield takeEvery(
        types.CATEGORIES_FETCH_STARTED,
        fetchCategories,
    );
};

// export function* watchAddCategory() {
//     yield takeEvery(
//         types.CATEGORY_ADD_STARTED,
//         addCategory,
//     );
// };