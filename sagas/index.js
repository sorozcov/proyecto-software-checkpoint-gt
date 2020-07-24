import { fork, all } from 'redux-saga/effects';

//Importamos los watchers
//import { watchLoginStarted } from './auth';

import { watchBranchesFetch, watchBranchesAdd, watchBranchesRemove, watchBranchesUpdate } from './branches';
import { watchFetchCategories , watchAddCategory, watchEditCategory, watchRemoveCategory } from './categories';
import { watchUsersFetchStarted, watchAddUsersStarted, watchEditUsersStarted, watchDeleteUserStarted } from './users';
import { watchProductsFetchStarted, watchAddProductsStarted, watchEditProductsStarted, watchDeleteProductStarted } from './products';


function* mainSaga() {
    yield all([
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
    ]);
}

export default mainSaga;