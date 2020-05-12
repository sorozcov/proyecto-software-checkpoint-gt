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

import { getUsers, updateUser } from '../firebase/users';

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

function* addUser(action) {
    try {
        var user = action.payload;
        const response = yield updateUser(user);
        if (response.error == null) {
            yield put(actions.completeAddingUser(response.user));
        } else {
            yield put(actions.failAddingUser(response.error));
        }
    } catch (error) {
        console.log(error)
        yield put(actions.failAddingUser('Falló al crear el usuario'));
    }
}

export function* watchAddUsersStarted() {
    yield takeEvery(
        types.USER_ADD_STARTED,
        addUser,
    );
}

function* editUser(action) {
    try {
        var user = action.payload;
        const response = yield updateUser(user);
        if (response.error == null) {
            yield put(actions.completeEditingUser(response.user));
        } else {
            yield put(actions.failEditingUser(response.error));
        }
    } catch (error) {
        yield put(actions.failEditingUser('Falló al editar el usuario'));
    }
}

export function* watchEditUsersStarted() {
    yield takeEvery(
        types.USER_EDIT_STARTED,
        editUser,
    );
}
  