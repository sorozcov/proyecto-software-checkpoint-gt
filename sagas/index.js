import { fork, all } from 'redux-saga/effects';

//Importamos los watchers
//import { watchLoginStarted } from './auth';
import { watchFetchCategories , watchAddCategory } from './categories';


import { watchUsersFetchStarted, watchAddUsersStarted, watchEditUsersStarted } from './users';


function* mainSaga(){
  yield all([

    //fork(watchLoginStarted),
    //fork(watchLoginStarted),
    fork (watchFetchCategories),
    fork(watchUsersFetchStarted),
    fork(watchAddUsersStarted),
    fork(watchEditUsersStarted),
    fork(watchAddCategory)

  ]);
}

export default mainSaga;
