import {
    //call,
    takeEvery,
    put,
    //delay,
    //select,
} from 'redux-saga/effects';
  
//import * as selectors from '../reducers';
import * as actions from '../actions/users';
import * as types from '../types/users';

import { getUsers, createUser } from '../../firebase/users';


function* fetchUsers(action) {
  try {
    const users = getUsers();
    const meseros = (await users).map(user => user.type === 'Mesero')

    const order = meseros.map(mesero => mesero.uid)
    const entities = {}
    meseros.map(mesero => entities[mesero.id] = mesero)

    yield put(actions.completeFetchingUsers(entities, order))
  } catch (error) {
    yield put(actions.failFetchingUsers('Falló el fetch de meseros'))
  }
}

export function* watchFetchUsersStarted() {
  yield takeEvery(
    types.USERS_FETCH_STARTED,
    fetchUsers,
  );
}

export async function deleteMeseros(meseroID){

  firebase.firestore()
    .collection('Meseros')
    .doc(meseroID).delete()
    .then(() => deleteComplete())
    .catch(error => console.log(error))
}

function* addUser(action) {
  try {
    var user = action.payload;
    const id = await createUser(user);
    if (id) {
      const oldId = user.userid;
      user.userid = id;
      yield put(actions.completeAddingUser(oldId,user));
    } else {
      yield put(actions.failAddingUser('Falló al crear el usuario'));
    }
  } catch (error) {
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
    const response = await editUser(user);
    if (response) {
      yield put(actions.completeEditingUser(user));
    } else {
      yield put(actions.failAddingUser('Falló al editar el usuario'));
    }
  } catch (error) {
    yield put(actions.failAddingUser('Falló al editar el usuario'));
  }
}

export function* watchEditUsersStarted() {
  yield takeEvery(
    types.USER_EDIT_STARTED,
    editUser,
  );
}
