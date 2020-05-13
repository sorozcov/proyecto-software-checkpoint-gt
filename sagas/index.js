import { fork, all } from 'redux-saga/effects';

//Importamos los watchers
//import { watchLoginStarted } from './auth';
import { watchFetchCategories } from './categories';


import { watchUsersFetchStarted, watchAddUsersStarted, watchEditUsersStarted, watchDeleteUserStarted } from './users';


function* mainSaga(){
  yield all([

    //fork(watchLoginStarted),
    //fork(watchLoginStarted),
    fork (watchFetchCategories),
    fork(watchUsersFetchStarted),
    fork(watchAddUsersStarted),
    fork(watchEditUsersStarted),
    fork(watchDeleteUserStarted)

  ]);
}

export default mainSaga;
