import {
    call,
    takeEvery,
    put,
    // race,
    // all,
    delay,
    select,
} from 'redux-saga/effects';

import * as selectors from '../src/reducers';
import * as actions from '../src/actions/users';
import * as types from '../src/types/users';

import { getUsers } from '../firebase/users';

function* usersFetchStarted(action) {
    try {
        const result = yield getUsers()

        yield put(actions.completeFetchingUsers(result.users.byId, result.users.order));
    } catch (error) {
        console.log("Falló el fetch de usuarios")
        yield put(actions.failFetchingUsers('Falló el fetch'))
    }
}

export function* watchUsersFetchStarted(){
    yield takeEvery(
        types.USERS_FETCH_STARTED,
        usersFetchStarted,
    );
}