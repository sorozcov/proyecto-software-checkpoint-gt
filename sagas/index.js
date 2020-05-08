import { fork, all } from 'redux-saga/effects';
//Importamos los watchers
//import { watchLoginStarted } from './auth';


//Main saga
//Fork para cada saga secundaria
function* mainSaga() {
  yield all([
    //fork(watchLoginStarted),
    //fork(watchLoginStarted),
  ]);
}


export default mainSaga;
