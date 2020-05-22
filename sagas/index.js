import { fork, all } from 'redux-saga/effects';

//Importamos los watchers
//import { watchLoginStarted } from './auth';

import { watchBranchesFetch, watchBranchesAdd, watchBranchesRemove, watchBranchesUpdate } from './branches';
import { watchFetchCategories , watchAddCategory } from './categories';
import { watchUsersFetchStarted, watchAddUsersStarted, watchEditUsersStarted, watchDeleteUserStarted } from './users';
import { watchProductsFetchStarted, watchAddProductsStarted, watchEditProductsStarted, watchDeleteProductStarted } from './products';


function* mainSaga() {
    yield all([

    //fork(watchLoginStarted),
    //fork(watchLoginStarted),

    fork(watchUsersFetchStarted),
    fork(watchAddUsersStarted),
    fork(watchEditUsersStarted),
    fork(watchDeleteUserStarted),
    fork (watchFetchCategories),
    fork(watchAddCategory),        
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