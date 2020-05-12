import { fork, all } from 'redux-saga/effects';

import { watchUsersFetchStarted, watchAddUsersStarted, watchEditUsersStarted } from './users';

function* mainSaga(){
  yield all([
    fork(watchUsersFetchStarted),
    fork(watchAddUsersStarted),
    fork(watchEditUsersStarted)
  ]);
}

export default mainSaga;
