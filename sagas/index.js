import { fork, all } from 'redux-saga/effects';

import { watchUsersFetchStarted } from './users';

function* mainSaga(){
  yield all([
    fork(watchUsersFetchStarted)
  ]);
}

export default mainSaga;
