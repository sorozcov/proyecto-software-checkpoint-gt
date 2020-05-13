import { fork, all } from 'redux-saga/effects';

//Importamos los watchers
//import { watchLoginStarted } from './auth';
import { watchFetchCategories , watchAddCategory } from './categories';


import { watchUsersFetchStarted, watchAddUsersStarted, watchEditUsersStarted, watchDeleteUserStarted } from './users';


function* mainSaga(){
  yield all([

    //fork(watchLoginStarted),
    //fork(watchLoginStarted),

    fork(watchUsersFetchStarted),
    fork(watchAddUsersStarted),
    fork(watchEditUsersStarted),
    fork(watchDeleteUserStarted),
    fork (watchFetchCategories),
    fork(watchAddCategory),




  ]);
}

export default mainSaga;
