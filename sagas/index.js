import { fork, all } from 'redux-saga/effects';
//Importamos los watchers
//import { watchLoginStarted } from './auth';
import { watchFetchCategories } from './categories';

//Main saga
//Fork para cada saga secundaria
function* mainSaga() {
  yield all([
    //fork(watchLoginStarted),
    //fork(watchLoginStarted),
    fork (watchFetchCategories),
  ]);
}


export default mainSaga;
