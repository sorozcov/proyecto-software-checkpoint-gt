import { all, fork } from 'redux-saga/effects';
//Importamos los watchers
//import { watchLoginStarted } from './auth';
import { watchBranchesAdd, watchBranchesFetch, watchBranchesRemove, watchBranchesUpdate } from './branches';
import { watchAddCategory, watchEditCategory, watchFetchCategories, watchRemoveCategory } from './categories';
import { watchLoginStarted, watchLogoffStarted } from './login';
import { watchAddOrderStarted, watchOrdersFetch, watchRemoveOrder } from './orders';
import { watchAddProductsStarted, watchDeleteProductStarted, watchEditProductsStarted, watchProductsFetchStarted, watchAddIngredientStarted } from './products';
import { watchAddUsersStarted, watchDeleteUserStarted, watchEditUsersStarted, watchUsersFetchStarted } from './users';



function* mainSaga() {
    yield all([

        fork(watchLoginStarted),
        fork(watchLogoffStarted),

        fork(watchUsersFetchStarted),
        fork(watchAddUsersStarted),
        fork(watchEditUsersStarted),
        fork(watchDeleteUserStarted),

        fork(watchFetchCategories),
        fork(watchAddCategory),
        fork(watchEditCategory),
        fork(watchRemoveCategory),

        fork(watchBranchesFetch),
        fork(watchBranchesAdd),
        fork(watchBranchesRemove),
        fork(watchBranchesUpdate),

        fork(watchProductsFetchStarted),
        fork(watchAddProductsStarted),
        fork(watchEditProductsStarted),
        fork(watchDeleteProductStarted),
        fork(watchAddIngredientStarted),

        fork(watchAddOrderStarted),
        fork(watchOrdersFetch),
        fork(watchRemoveOrder),
    ]);
}

export default mainSaga;